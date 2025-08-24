const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log('🔑 Testing Gemini API Key directly...');
console.log('API Key (first 10 chars):', GEMINI_API_KEY ? GEMINI_API_KEY.substring(0, 10) + '...' : 'NOT FOUND');

if (!GEMINI_API_KEY) {
  console.log('❌ GEMINI_API_KEY not found in .env file');
  process.exit(1);
}

async function testGeminiAPI() {
  try {
    console.log('\n📡 Making request to Gemini API...');
    
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [{ parts: [{ text: 'Hello, this is a test message.' }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 50
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY
        },
        timeout: 10000
      }
    );

    const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('✅ Gemini API test PASSED!');
    console.log('Response:', aiText?.trim() || 'No response text');
    
  } catch (err) {
    console.log('❌ Gemini API test FAILED!');
    console.log('Error status:', err.response?.status);
    console.log('Error message:', err.response?.data?.error?.message || err.message);
    
    if (err.response?.status === 400) {
      console.log('\n🔍 This is a 400 BadRequest error - likely API key issue');
    } else if (err.response?.status === 401) {
      console.log('\n🔍 This is a 401 Unauthorized error - API key is invalid');
    } else if (err.response?.status === 429) {
      console.log('\n🔍 This is a 429 Too Many Requests error - rate limit exceeded');
    }
  }
}

testGeminiAPI();
