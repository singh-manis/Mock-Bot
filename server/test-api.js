const axios = require('axios');

const BASE_URL = 'http://localhost:3002/api';

async function testAPI() {
  console.log('🧪 Testing MockBot API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    console.log('');

    // Test Gemini API (if configured)
    console.log('2. Testing Gemini AI integration...');
    try {
      const geminiResponse = await axios.get(`${BASE_URL}/test-gemini`);
      console.log('✅ Gemini AI test passed:', geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text?.substring(0, 100) + '...');
    } catch (error) {
      console.log('⚠️  Gemini AI test failed:', error.response?.data?.error || error.message);
      console.log('   Make sure GEMINI_API_KEY is set in your .env file');
    }
    console.log('');

    // Test chat endpoint
    console.log('3. Testing chat endpoint...');
    try {
      const chatResponse = await axios.post(`${BASE_URL}/chat`, {
        message: 'Hello, I want to practice technical interviews',
        role: 'technical'
      });
      console.log('✅ Chat endpoint test passed:', chatResponse.data.reply?.substring(0, 100) + '...');
    } catch (error) {
      console.log('❌ Chat endpoint test failed:', error.response?.data?.error || error.message);
    }
    console.log('');

    console.log('🎉 API testing completed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\nMake sure your server is running on port 5000');
  }
}

// Run the test
testAPI(); 