// Direct email test script
// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function testEmailDirectly() {
  console.log('🔍 Checking environment variables...');
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 8)}...` : 'NOT SET');
  console.log('RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'NOT SET');
  console.log('RFQ_TO_EMAIL:', process.env.RFQ_TO_EMAIL || 'NOT SET');
  
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not configured');
    return;
  }
  
  if (!process.env.RESEND_FROM_EMAIL) {
    console.error('❌ RESEND_FROM_EMAIL is not configured');
    return;
  }
  
  if (!process.env.RFQ_TO_EMAIL) {
    console.error('❌ RFQ_TO_EMAIL is not configured');
    return;
  }
  
  const emailData = {
    from: process.env.RESEND_FROM_EMAIL,
    to: [process.env.RFQ_TO_EMAIL],
    subject: 'Test Email from FastFunRC Website',
    text: `This is a test email to verify that the email functionality is working.\n\nSent at: ${new Date().toISOString()}\n\nTest Details:\n- From: ${process.env.RESEND_FROM_EMAIL}\n- To: ${process.env.RFQ_TO_EMAIL}\n- API Key: ${process.env.RESEND_API_KEY.substring(0, 8)}...`,
  };
  
  console.log('🔍 Sending test email via Resend API...');
  console.log('📧 Email data:', JSON.stringify(emailData, null, 2));
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    
    console.log('🔍 Response status:', response.status);
    console.log('🔍 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('🔍 Response body:', responseText);
    
    if (response.ok) {
      const result = JSON.parse(responseText);
      console.log('✅ Email sent successfully!');
      console.log('📧 Result:', result);
    } else {
      console.error('❌ Failed to send email');
      console.error('📧 Error response:', responseText);
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

// Run the test
testEmailDirectly();