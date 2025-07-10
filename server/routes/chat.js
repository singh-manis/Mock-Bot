const express = require('express');
const axios = require('axios');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Validate API key
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

router.post('/', [
  body('message').notEmpty().withMessage('Message is required'),
  body('role').notEmpty().withMessage('Role or skill is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message, role, roleContext } = req.body;

  if (!message || !role) {
    return res.status(400).json({ error: 'Message and role are required.' });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'AI service is not configured. Please check server configuration.' });
  }

  try {
    // Get role-specific interview style
    const getRoleStyle = (role) => {
      const styles = {
        'technical': {
          approach: 'technical problem-solving',
          focus: 'coding challenges, system design, debugging scenarios',
          tone: 'collaborative and analytical'
        },
        'behavioral': {
          approach: 'experience-based questions',
          focus: 'past projects, teamwork, challenges overcome',
          tone: 'conversational and reflective'
        },
        'leadership': {
          approach: 'leadership scenarios and decision-making',
          focus: 'team management, strategic thinking, conflict resolution',
          tone: 'professional and inspiring'
        },
        'presentation': {
          approach: 'communication and presentation skills',
          focus: 'public speaking, stakeholder communication, storytelling',
          tone: 'encouraging and supportive'
        }
      };
      return styles[role] || styles['technical'];
    };

    const roleStyle = getRoleStyle(role);

    // Enhanced prompt for better interview responses with role context
    let systemPrompt = `You are an expert mock interview coach conducting a ${roleStyle.approach} interview. Your focus is on ${roleStyle.focus}. Maintain a ${roleStyle.tone} tone.`;

    // Add role-specific context if provided
    if (roleContext) {
      systemPrompt += `\n\n${roleContext}`;
    }

    systemPrompt += `

IMPORTANT GUIDELINES:
1. Be conversational and natural, not robotic or textbook-like
2. Ask ONE question at a time and wait for the candidate's response
3. Provide specific, constructive feedback on their answers
4. Ask follow-up questions based on their responses
5. Keep responses concise (2-4 sentences max)
6. Be encouraging but professional
7. Adapt your questions based on the conversation flow
8. Do NOT repeat questions already asked in this session. Always generate a new, relevant question based on the conversation so far.
9. Each question should be clearly structured, focused on one topic, and easy to understand. Use bullet points or numbered lists if helpful. Avoid vague or overly broad questions.`;

    systemPrompt += `

INTERVIEW STYLE:
- Start with a warm, professional greeting
- Ask specific, practical questions relevant to ${role}
- If they answer well, acknowledge it and ask a follow-up
- If they struggle, provide gentle guidance and ask a simpler question
- Make the conversation feel like a real interview, not a quiz

Current skill area: ${role}
User message: "${message}"

Respond as a helpful, engaging interview coach. If this is the first message, start the interview naturally. If they've answered a question, provide feedback and ask the next relevant question.`;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 150,
          topP: 0.9,
          topK: 50
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY
        },
        timeout: 10000 // 10 second timeout
      }
    );

    // Better response parsing
    const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      console.error('No text in Gemini response:', response.data);
      return res.status(500).json({ error: 'AI response was empty. Please try again.' });
    }

    res.json({ reply: aiText.trim() });
  } catch (err) {
    console.error('Gemini API error:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status
    });
    
    // More specific error messages
    if (err.response?.status === 400) {
      res.status(500).json({ error: 'Invalid request to AI service. Please check your input.' });
    } else if (err.response?.status === 401) {
      res.status(500).json({ error: 'AI service authentication failed. Please check API key.' });
    } else if (err.response?.status === 429) {
      res.status(500).json({ error: 'AI service rate limit exceeded. Please try again later.' });
    } else if (err.code === 'ECONNABORTED') {
      res.status(500).json({ error: 'AI service request timed out. Please try again.' });
    } else {
      res.status(500).json({ error: 'Failed to get response from AI service. Please try again.' });
    }
  }
});

module.exports = router; 