// Test script to debug RFQ email functionality
// Run this with: node test-rfq-debug.js

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { default: fetch } = require('node-fetch');

async function testRfqSubmission() {
  console.log('🧪 Testing RFQ submission...');
  
  // Create test form data
  const formData = new FormData();
  formData.append('name', 'Test User');
  formData.append('email', 'test@example.com');
  formData.append('country', 'Test Country');
  formData.append('message', 'This is a test message for debugging RFQ functionality.');
  formData.append('source', 'debug_test');
  
  try {
    console.log('📤 Sending test request to /api/rfq...');
    
    const response = await fetch('http://localhost:3000/api/rfq', {
      method: 'POST',
      body: formData,
    });
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const result = await response.text();
    console.log('📥 Response body:', result);
    
    // Try to parse as JSON if possible
    try {
      const jsonResult = JSON.parse(result);
      console.log('✅ Parsed JSON response:', jsonResult);
    } catch (e) {
      console.log('⚠️ Response is not valid JSON');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Check environment variables
console.log('🔍 Checking environment variables...');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 8)}...` : 'NOT SET');
console.log('RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'NOT SET');
console.log('RFQ_TO_EMAIL:', process.env.RFQ_TO_EMAIL || 'NOT SET');

// Run the test
testRfqSubmission();