import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Send, Mic, MicOff, Download, Save, RotateCcw, Sparkles, ChevronRight, Brain, Users, Star, Target } from 'lucide-react';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { API_ENDPOINTS } from '../config';

const skills = [
  { 
    id: 'technical', 
    name: 'Technical Skills', 
    icon: Brain, 
    color: 'from-cyan-500 to-blue-600', 
    desc: 'Coding challenges, system design, debugging scenarios',
    examples: 'Algorithms, data structures, system architecture'
  },
  { 
    id: 'behavioral', 
    name: 'Behavioral Questions', 
    icon: Users, 
    color: 'from-green-500 to-emerald-600', 
    desc: 'Past experiences, teamwork, problem-solving stories',
    examples: 'Leadership examples, conflict resolution, achievements'
  },
  { 
    id: 'leadership', 
    name: 'Leadership & Management', 
    icon: Star, 
    color: 'from-purple-500 to-pink-600', 
    desc: 'Team management, strategic decisions, vision setting',
    examples: 'Team building, decision-making, strategic planning'
  },
  { 
    id: 'presentation', 
    name: 'Presentation Skills', 
    icon: Target, 
    color: 'from-orange-500 to-red-600', 
    desc: 'Public speaking, stakeholder communication, storytelling',
    examples: 'Pitch presentations, technical demos, executive summaries'
  }
];

const welcomeMessage = {
  id: 'welcome',
  type: 'bot',
  content: "Welcome to MockBot! I'm your advanced interview coach. Select a skill to begin.",
  timestamp: new Date().toISOString()
};

const MockInterviewBot = () => {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('select');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const [showTips, setShowTips] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceOnlyMode, setVoiceOnlyMode] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleId = params.get('role');
    const saved = localStorage.getItem('mockbot-session');
    const resumeSession = localStorage.getItem('mockbot-resume-session');
    // If resuming a session, do that first
    if (resumeSession) {
      try {
        const session = JSON.parse(resumeSession);
        setMessages(session.messages || [welcomeMessage]);
        setSelectedSkill(session.skill || '');
        setCurrentPhase('chat');
        localStorage.removeItem('mockbot-resume-session');
        toast.success('Session resumed!');
        return;
      } catch (error) {
        setCurrentPhase('select');
        return;
      }
    } else if (saved) {
      setCurrentPhase('resume');
      return;
    }
    // If role param is present, start role-based chat only
    if (roleId) {
      setCurrentPhase('chat');
      setMessages([
        {
          id: 'welcome',
          type: 'bot',
          content: `Welcome! Let's start your mock interview for the role of ${roleId}. Please introduce yourself or say "ready" to begin!`,
          timestamp: new Date().toISOString()
        }
      ]);
      return;
    }
    // Otherwise, show skill cards only
    setCurrentPhase('select');
  }, [location.search]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        
        // Auto-send message in voice-only mode
        if (voiceOnlyMode) {
          setTimeout(() => {
            handleSendMessage();
          }, 500);
        }
      };
      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        toast.error('Speech recognition error: ' + event.error);
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      setVoiceEnabled(true);
    } else {
      setVoiceEnabled(false);
      toast.error('Speech recognition is not supported in this browser.');
    }
  }, [voiceOnlyMode]);

  // Add helper to check if a message is the latest bot message
  const isLatestBotMessage = (idx) => {
    return (
      messages[idx].type === 'bot' &&
      idx === messages.length - 1
    );
  };

  // When picking a skill, do not set any role context
  const handleSkillSelect = (skill) => {
    localStorage.removeItem('selectedRole'); // Clear any previous role selection
    setSelectedSkill(skill.id);
    setCurrentPhase('chat');
    setMessages([
      welcomeMessage,
      {
        id: Date.now(),
        type: 'user',
        content: `I want to practice ${skill.name}`,
        timestamp: new Date().toISOString()
      }
    ]);
    setIsTyping(true);
    const conversationStarters = {
      'technical': "Hi! I'm ready for a technical interview. I'd love to work through some coding problems or discuss system design. Please start with a warm greeting and an engaging technical question.",
      'behavioral': "Hello! I'm here to practice behavioral interview questions. I'm ready to share examples from my experience and discuss how I handle various workplace situations. Please start naturally.",
      'leadership': "Hi there! I'm excited to practice leadership interview questions. I'm ready to discuss my leadership style, team management experiences, and strategic thinking. Please begin the interview.",
      'presentation': "Hello! I'm here to practice presentation and communication skills. I'm ready to work on public speaking, stakeholder communication, and storytelling. Please start the session."
    };
    const initialMessage = conversationStarters[skill.id] || `Hi! I'm ready to practice ${skill.name.toLowerCase()}. Please start the interview with a warm greeting and ask me an engaging first question.`;
    fetchAIResponse(initialMessage, skill.id, null);
  };

  const handleStartNewSession = () => {
    setCurrentPhase('select');
    setSelectedSkill('');
    setMessages([welcomeMessage]);
    setInputValue('');
    setIsTyping(false);
    setIsRecording(false);
    // Clear any saved session
    localStorage.removeItem('mockbot-session');
  };

  const fetchAIResponse = async (userMessage, skillId, roleId) => {
    try {
      let roleContext = '';
      if (roleId) {
        // Role-based context
        roleContext = `\n\nIMPORTANT CONTEXT: The user is practicing for the role: ${roleId}. Focus on ${roleId} specific questions, technologies, and scenarios.`;
      } else if (skillId) {
        // Skill-based context
        roleContext = `\n\nIMPORTANT CONTEXT: The user is practicing for the skill: ${skillId}.`;
      }
      console.log('Sending chat request:', { message: userMessage, role: roleId || skillId, roleContext });

      // Prepare conversation history (exclude the current message being sent)
      const conversationHistory = messages.map(msg => ({
        type: msg.type,
        content: msg.content
      }));

      const res = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          message: userMessage, 
          role: roleId || skillId,
          roleContext: roleContext,
          conversationHistory: conversationHistory
        })
      });
      
      const data = await res.json();
      console.log('Chat response:', data);
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }
      
      // Only throw if reply is truly missing or empty
      if (typeof data.reply !== 'string' || data.reply.trim() === '') {
        throw new Error('AI service returned empty response');
      }
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: data.reply,
        timestamp: new Date().toISOString()
      }]);
      
      // Auto-speak AI response if enabled
      if (autoSpeak && data.reply) {
        setTimeout(() => {
          const newMessageIndex = messages.length;
          setSpeakingIdx(newMessageIndex);
          speakText(data.reply);
        }, 300);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        type: 'bot',
        content: `Error: ${err.message}. Please try again or check your connection.`,
        timestamp: new Date().toISOString()
      }]);
      toast.error(`Error: Could not get AI response. Please try again.`);
    } finally {
      setIsTyping(false);
    }
  };

  const handleListen = (text, idx) => {
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      setSpeakingIdx(idx);
      setIsPaused(false);
      utterance.onend = () => {
        setSpeakingIdx(null);
        setIsPaused(false);
      };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error('Text-to-speech is not supported in this browser.');
    }
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window && (window.speechSynthesis.speaking || window.speechSynthesis.paused)) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      setIsPaused(false);
    }
  };

  // Enhanced voice functions
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to use a more natural voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Natural') || 
        voice.name.includes('Premium')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => {
        setSpeakingIdx(null);
        setIsPaused(false);
      };
      
      utterance.onerror = () => {
        setSpeakingIdx(null);
        setIsPaused(false);
      };
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVoiceMode = () => {
    setVoiceOnlyMode(!voiceOnlyMode);
    if (!voiceOnlyMode) {
      toast.success('Voice-only mode enabled! Speak your answers.');
    } else {
      toast.info('Voice-only mode disabled. You can type or speak.');
    }
  };

  const handleVoiceInput = () => {
    if (!voiceEnabled) {
      toast.error('Voice input is not supported in this browser.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
      toast.info('Listening... Speak now!');
    }
  };

  const handleSendMessage = () => {
    const params = new URLSearchParams(location.search);
    const roleId = params.get('role');
    if (!inputValue.trim()) return;

    // Only require skill if not in role mode
    if (!roleId && !selectedSkill) {
      toast.error('Please select a skill first before sending messages.');
      return;
    }

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    if (roleId) {
      // Role-based chat: send message with role context
      fetchAIResponse(inputValue, null, roleId);
    } else {
      // Skill-based chat: send message with skill context
      fetchAIResponse(inputValue, selectedSkill, null);
    }
  };

  // Export chat as PDF
  const handleExport = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(16);
    doc.text('MockBot Interview Session', 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.text(`Skill: ${skills.find(s => s.id === selectedSkill)?.name || ''}`, 10, y);
    y += 8;
    doc.text(`Date: ${new Date().toLocaleString()}`, 10, y);
    y += 10;
    messages.forEach(msg => {
      if (y > 280) { doc.addPage(); y = 10; }
      doc.setFont(undefined, msg.type === 'user' ? 'bold' : 'normal');
      doc.text(`${msg.type === 'user' ? 'You' : 'MockBot'}: ${msg.content}`, 10, y);
      y += 8;
    });
    doc.save('mockbot-session.pdf');
  };

  // Save session to server with user authentication
  const handleSaveSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to save sessions');
        return;
      }

      // Convert client messages format to server format
      const serverMessages = messages.map(msg => ({
        sender: msg.type === 'user' ? 'user' : 'bot',
        text: msg.content,
        timestamp: new Date(msg.timestamp)
      }));

      const sessionData = {
        role: selectedSkill || new URLSearchParams(location.search).get('role') || 'general',
        messages: serverMessages
      };

      const response = await fetch(API_ENDPOINTS.SESSIONS, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // If token is invalid, clear it and redirect to login
        if (response.status === 401 && errorData.error === 'Invalid token') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('Session expired. Please log in again.');
          window.location.href = '/login';
          return;
        }
        
        throw new Error(errorData.error || 'Failed to save session');
      }

      const savedSession = await response.json();
      toast.success('Session saved successfully!');
      
      // Also save to localStorage for backward compatibility (but with server ID)
      const clientSession = {
        id: savedSession._id,
        skill: savedSession.role,
        messages: messages,
        timestamp: new Date().toISOString()
      };
      
      // Get existing sessions from localStorage
      const existingSessions = localStorage.getItem('mockbot-sessions');
      let sessions = [];
      
      if (existingSessions) {
        try {
          sessions = JSON.parse(existingSessions);
          if (!Array.isArray(sessions)) {
            sessions = [sessions];
          }
        } catch (error) {
          console.error('Error parsing existing sessions:', error);
          sessions = [];
        }
      }
      
      // Add new session
      sessions.push(clientSession);
      localStorage.setItem('mockbot-sessions', JSON.stringify(sessions));
      
    } catch (error) {
      console.error('Error saving session:', error);
      toast.error('Failed to save session. Please try again.');
    }
  };

  // Resume session from localStorage
  const handleResumeSession = () => {
    const saved = localStorage.getItem('mockbot-session');
    if (saved) {
      try {
        const { messages: savedMessages, skill } = JSON.parse(saved);
        setMessages(savedMessages);
        setSelectedSkill(skill);
        setCurrentPhase('chat');
        toast.success('Session resumed!');
      } catch (error) {
        console.error('Error resuming session:', error);
        toast.error('Error resuming session. Starting fresh.');
        setCurrentPhase('select');
      }
    }
  };

  // Add handlers for next steps
  const handlePracticeAgain = () => {
    if (selectedSkill) {
      const skill = skills.find(s => s.id === selectedSkill);
      const initialMessage = `Let's try another ${skill.name} question.`;
      fetchAIResponse(initialMessage, selectedSkill, null);
    } else if (new URLSearchParams(location.search).get('role')) {
      const roleId = new URLSearchParams(location.search).get('role');
      const initialMessage = `Let's try another question for the role of ${roleId}.`;
      fetchAIResponse(initialMessage, null, roleId);
    }
  };
  const handleHarderQuestion = () => {
    if (selectedSkill) {
      const skill = skills.find(s => s.id === selectedSkill);
      const initialMessage = `Give me a harder ${skill.name} question.`;
      fetchAIResponse(initialMessage, selectedSkill, null);
    } else if (new URLSearchParams(location.search).get('role')) {
      const roleId = new URLSearchParams(location.search).get('role');
      const initialMessage = `Give me a harder question for the role of ${roleId}.`;
      fetchAIResponse(initialMessage, null, roleId);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[60vh] animate-fade-in w-full">
      <div className="glass card-elevated bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl mx-4 border border-white/10">
        {currentPhase === 'resume' && (
          <div className="p-8 flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold text-white text-center">Resume Your Session</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleResumeSession}
                className="btn-primary btn-interactive flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
              >
                <RotateCcw className="w-5 h-5" /> Resume Previous Session
              </button>
              <button
                onClick={handleStartNewSession}
                className="btn-secondary btn-interactive flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-cyan-500/20 text-white rounded-xl font-semibold transition-all"
              >
                Start New Session
              </button>
            </div>
          </div>
        )}
        
        {currentPhase === 'select' && !new URLSearchParams(location.search).get('role') && (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Select a Skill to Practice
            </h2>
            
            {/* Tips section */}
            <div className="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Pro Tips for Better Practice
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-lg">•</span>
                  <span>Be specific and detailed in your answers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-lg">•</span>
                  <span>Use real examples from your experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-lg">•</span>
                  <span>Ask for clarification if needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-lg">•</span>
                  <span>Practice active listening and responding thoughtfully</span>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <button
                  key={skill.id}
                  className={`group flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-cyan-400 transition-all duration-300 hover:scale-105 focus:outline-none interactive card-elevated`}
                  onClick={() => handleSkillSelect(skill)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${skill.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <skill.icon className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <span className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{skill.name}</span>
                  <span className="text-gray-300 text-sm mb-2 text-center">{skill.desc}</span>
                  <span className="text-cyan-400/70 text-xs mb-3 text-center px-2">{skill.examples}</span>
                  <span className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors text-sm font-medium">
                    Start Practice 
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {currentPhase === 'chat' && (
          <div className="p-6">
            {/* Role Indicator */}
            {(() => {
              try {
                const selectedRole = localStorage.getItem('selectedRole');
                if (selectedRole) {
                  const role = JSON.parse(selectedRole);
                  const RoleIcon = role.icon || Target;
                  return (
                    <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center`}>
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-cyan-300">Practicing for: {role.name}</div>
                          <div className="text-sm text-gray-300">{role.description}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          localStorage.removeItem('selectedRole');
                          setCurrentPhase('select');
                        }}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-sm text-gray-300 rounded-lg transition-all focus-ring"
                        title="Change role selection"
                      >
                        Change Role
                      </button>
                    </div>
                  );
                }
              } catch (error) {
                return null;
              }
            })()}
            
            {/* Message list */}
            <ChatMessages
              messages={messages}
              speakingIdx={speakingIdx}
              isLatestBotMessage={isLatestBotMessage}
              handleListen={handleListen}
              handlePause={handlePause}
              handleResume={handleResume}
              handleStop={handleStop}
              isPaused={isPaused}
              handlePracticeAgain={handlePracticeAgain}
              handleHarderQuestion={handleHarderQuestion}
              showTips={showTips}
              setShowTips={setShowTips}
            />
            
            {/* Status indicators - only show when needed */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in-up mb-4">
                <div className="glass voice-indicator-enhanced rounded-2xl px-6 py-4 max-w-md flex items-center gap-4">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                  <span className="text-sm text-gray-300 font-medium">MockBot is thinking...</span>
                </div>
              </div>
            )}
            
            {speakingIdx !== null && (
              <div className="flex justify-start animate-fade-in-up mb-4">
                <div className="glass voice-indicator-enhanced rounded-2xl px-6 py-4 max-w-md flex items-center gap-4 speaking-glow">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-300 font-medium">MockBot is speaking...</span>
                </div>
              </div>
            )}
            
            {/* Simplified Voice Controls - only essential toggles */}
            {voiceEnabled && (
              <div className="voice-controls-clean">
                <div className="controls-body">
                  <div className="flex items-center gap-4">
                    <h3 className="text-base font-medium text-gray-300 flex items-center gap-2">
                      <span role="img" aria-label="Voice" className="text-lg">🎤</span>
                      Voice Settings
                    </h3>
                    <button
                      onClick={toggleVoiceMode}
                      className={`btn-clean ${
                        voiceOnlyMode 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg' 
                          : 'btn-secondary'
                      }`}
                    >
                      {voiceOnlyMode ? 'Voice Only' : 'Mixed Mode'}
                    </button>
                    <button
                      onClick={() => setAutoSpeak(!autoSpeak)}
                      className={`btn-clean ${
                        autoSpeak 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                          : 'btn-secondary'
                      }`}
                    >
                      {autoSpeak ? 'Auto-Speak On' : 'Auto-Speak Off'}
                    </button>
                  </div>
                  
                  {/* Single voice input button */}
                  <button
                    onClick={handleVoiceInput}
                    className={`p-3 rounded-xl transition-all focus-ring ${
                      isListening 
                        ? 'bg-red-500 animate-pulse listening-wave' 
                        : voiceOnlyMode 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg' 
                          : 'btn-secondary'
                    }`}
                    title={isListening ? 'Stop Listening' : 'Start Voice Input'}
                  >
                    {isListening ? (
                      <span role="img" aria-label="Listening" className="text-lg">🔴</span>
                    ) : (
                      <span role="img" aria-label="Mic" className="text-lg">🎙️</span>
                    )}
                  </button>
                </div>
                
                {/* Status info - only show when relevant */}
                {(voiceOnlyMode || autoSpeak) && (
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    {voiceOnlyMode && <span>Voice-only mode active</span>}
                    {autoSpeak && <span>Auto-speak enabled</span>}
                  </div>
                )}
              </div>
            )}
            
            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              handleMicClick={handleVoiceInput}
              handleExport={handleExport}
              handleSaveSession={handleSaveSession}
              isListening={isListening}
              voiceOnlyMode={voiceOnlyMode}
            />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

const Chat = () => (
  <Layout>
    <div className="w-full mt-8 p-4 md:p-8">
      <MockInterviewBot />
    </div>
  </Layout>
);

export default Chat;
