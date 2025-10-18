/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from 'next/server';

import { getServerRfqConfig } from '@/config/rfq-config';

// Only import nodemailer when running in Node.js environment
let nodemailer: any;
let AttachmentType: any;

if (typeof window === 'undefined') {
  try {
    nodemailer = require('nodemailer');
    AttachmentType = require('nodemailer/lib/mailer').Attachment;
  } catch (error) {
    console.warn('nodemailer not available, falling back to client-side submission');
  }
}

export const runtime = 'nodejs';

const MAX_TOTAL_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB

// Resend API function for static environments
async function sendEmailWithResend(emailData: {
  to: string;
  from: string;
  subject: string;
  text: string;
  attachments?: any[];
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
  
  console.log('🔍 Resend Debug - Environment variables:', {
    hasApiKey: !!RESEND_API_KEY,
    apiKeyPrefix: RESEND_API_KEY ? `${RESEND_API_KEY.substring(0, 8)}...` : 'missing',
    providedFrom: emailData.from,
    configuredResendFrom: RESEND_FROM_EMAIL,
    toEmail: emailData.to
  });
  
  if (!RESEND_API_KEY) {
    console.error('❌ Resend Debug - RESEND_API_KEY is not configured');
    throw new Error('RESEND_API_KEY is not configured');
  }

  const requestBody = {
    from: emailData.from,
    to: [emailData.to],
    subject: emailData.subject,
    text: emailData.text,
    attachments: emailData.attachments,
  };
  
  console.log('🔍 Resend Debug - Request body:', JSON.stringify(requestBody, null, 2));

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  console.log('🔍 Resend Debug - Response status:', response.status);
  console.log('🔍 Resend Debug - Response headers:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ Resend Debug - Error response:', error);
    throw new Error(`Failed to send email: ${error}`);
  }

  const result = await response.json();
  console.log('✅ Resend Debug - Success response:', result);
  return result;
}

// Formspree API function for free static environments
async function sendEmailWithFormspree(emailData: {
  to: string;
  from: string;
  subject: string;
  text: string;
  formId: string;
}) {
  const FORMSPREE_ENDPOINT = `https://formspree.io/f/${emailData.formId}`;
  
  const formData = new FormData();
  formData.append('name', emailData.text.match(/Name: (.+)/)?.[1] || '');
  formData.append('email', emailData.from);
  formData.append('subject', emailData.subject);
  formData.append('message', emailData.text);
  
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to send email via Formspree: ${error.error || 'Unknown error'}`);
  }

  return response.json();
}

// EmailJS function for free static environments
async function sendEmailWithEmailJS(emailData: {
  to: string;
  from: string;
  subject: string;
  text: string;
  serviceId: string;
  templateId: string;
  publicKey: string;
}) {
  const {
    to,
    from,
    subject,
    text,
    serviceId,
    templateId,
    publicKey,
  } = emailData;
  
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing');
  }

  // Extract form data from the text
  const nameMatch = text.match(/Name: (.+)/);
  const emailMatch = text.match(/Email: (.+)/);
  const messageMatch = text.match(/Message: ([\s\S]+)/);
  
  const templateParams = {
    from_name: nameMatch?.[1] || 'Unknown',
    from_email: emailMatch?.[1] || from,
    to_email: to,
    subject,
    message: messageMatch?.[1] || text,
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email via EmailJS');
  }

  return response.json();
}

function buildEmailContent({
  name,
  email,
  country,
  message,
  source,
  userAgent,
}: {
  name: string;
  email: string;
  country?: string;
  message?: string;
  source?: string;
  userAgent?: string;
}) {
  const lines = [
    'New RFQ submission received:',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    country ? `Country: ${country}` : undefined,
    source ? `Source: ${source}` : undefined,
    userAgent ? `User-Agent: ${userAgent}` : undefined,
    '',
    'Message:',
    message ? message : '(No message provided)',
  ].filter(Boolean);

  return lines.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 POST Debug - Starting RFQ submission...');
    
    const formData = await request.formData();
    console.log('🔍 POST Debug - Form data received:', {
      keys: Array.from(formData.keys()),
      hasAttachments: formData.getAll('attachments').length > 0,
      attachmentCount: formData.getAll('attachments').length
    });

    const honeypot = formData.get('website');
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      console.log('🔍 POST Debug - Honeypot triggered, returning success');
      return NextResponse.json({ success: true });
    }

    const name = formData.get('name');
    const email = formData.get('email');
    const country = formData.get('country');
    const message = formData.get('message');
    const source = formData.get('source');

    if (typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 },
      );
    }

    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    const totalSize = formData
      .getAll('attachments')
      .reduce((acc, item) => (item instanceof File ? acc + item.size : acc), 0);

    if (totalSize > MAX_TOTAL_ATTACHMENT_SIZE) {
      return NextResponse.json(
        { error: 'Attachments exceed the 10MB size limit.' },
        { status: 400 },
      );
    }

    // Prepare email content
    const emailContent = buildEmailContent({
      name: name.trim(),
      email: email.trim(),
      country: typeof country === 'string' ? country.trim() : undefined,
      message: typeof message === 'string' ? message.trim() : undefined,
      source: typeof source === 'string' ? source.trim() : undefined,
      userAgent: request.headers.get('user-agent') ?? undefined,
    });

    // Prepare attachments
    const attachments = await Promise.all(
      formData.getAll('attachments').map(async (item, index) => {
        if (!(item instanceof File)) return null;

        const buffer = Buffer.from(await item.arrayBuffer());
        const base64 = buffer.toString('base64');

        return {
          filename: item.name || `attachment-${index + 1}`,
          content: base64,
        };
      }),
    );

    const attachmentList = attachments.filter(Boolean);

    const rfqConfig = getServerRfqConfig();

    // Try to send email using various services in order of preference
    // 1. Resend API (paid, but reliable)
    console.log('🔍 Main Debug - RFQ configuration snapshot:', {
      hasApiKey: !!process.env.RESEND_API_KEY,
      resendFromEmail: rfqConfig.resendFromEmail,
      effectiveFromEmail: rfqConfig.fromEmail,
      effectiveToEmail: rfqConfig.toEmail,
      formspreeConfigured: !!rfqConfig.formspreeFormId,
      emailJsConfigured:
        !!rfqConfig.emailJs.serviceId &&
        !!rfqConfig.emailJs.templateId &&
        !!rfqConfig.emailJs.publicKey,
      smtpConfigured:
        !!rfqConfig.smtp.host &&
        !!rfqConfig.smtp.user &&
        !!rfqConfig.smtp.pass,
    });
    
    if (process.env.RESEND_API_KEY) {
      try {
        console.log('🔍 Main Debug - Attempting Resend API call...');
        await sendEmailWithResend({
          from: rfqConfig.resendFromEmail || rfqConfig.fromEmail,
          to: rfqConfig.toEmail,
          subject: 'New RFQ submission',
          text: emailContent,
          attachments: attachmentList.length > 0 ? attachmentList : undefined,
        });

        console.log('✅ Main Debug - Resend API succeeded');
        return NextResponse.json({
          success: true,
          message: 'RFQ submitted successfully. We will contact you soon.'
        });
      } catch (resendError) {
        console.error('❌ Main Debug - Resend API failed:', resendError);
        // Fall back to next service
      }
    } else {
      console.log('⚠️ Main Debug - RESEND_API_KEY not found, skipping Resend');
    }
    
    // 2. Formspree (free tier available - 50 submissions/month)
    if (rfqConfig.formspreeFormId) {
      try {
        await sendEmailWithFormspree({
          from: email.trim(),
          to: rfqConfig.toEmail,
          subject: 'New RFQ submission',
          text: emailContent,
          formId: rfqConfig.formspreeFormId,
        });

        return NextResponse.json({
          success: true,
          message: 'RFQ submitted successfully. We will contact you soon.'
        });
      } catch (formspreeError) {
        console.error('Formspree API failed:', formspreeError);
        // Fall back to next service
      }
    }
    
    // 3. EmailJS (free tier available - 200 emails/month)
    const { serviceId, templateId, publicKey } = rfqConfig.emailJs;
    if (serviceId && templateId && publicKey) {
      try {
        await sendEmailWithEmailJS({
          from: email.trim(),
          to: rfqConfig.toEmail,
          subject: 'New RFQ submission',
          text: emailContent,
          serviceId,
          templateId,
          publicKey,
        });

        return NextResponse.json({
          success: true,
          message: 'RFQ submitted successfully. We will contact you soon.'
        });
      } catch (emailjsError) {
        console.error('EmailJS API failed:', emailjsError);
        // Fall back to nodemailer if available
      }
    }

    // Check if nodemailer is available (for server environments)
    if (
      nodemailer &&
      rfqConfig.smtp.host &&
      rfqConfig.smtp.user &&
      rfqConfig.smtp.pass
    ) {
      try {
        const smtpPort = rfqConfig.smtp.port ?? 587;

        const transporter = nodemailer.createTransport({
          host: rfqConfig.smtp.host,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: rfqConfig.smtp.user,
            pass: rfqConfig.smtp.pass,
          },
        });

        const nodemailerAttachments = await Promise.all(
          formData.getAll('attachments').map(async (item, index) => {
            if (!(item instanceof File)) return null;

            const buffer = Buffer.from(await item.arrayBuffer());

            return {
              filename: item.name || `attachment-${index + 1}`,
              content: buffer,
              contentType: item.type || undefined,
            } as typeof AttachmentType;
          }),
        );

        const nodemailerAttachmentList = nodemailerAttachments.filter(Boolean) as typeof AttachmentType[];

        await transporter.sendMail({
          from: rfqConfig.fromEmail,
          to: rfqConfig.toEmail,
          replyTo: email.trim(),
          subject: 'New RFQ submission',
          text: emailContent,
          attachments: nodemailerAttachmentList.length > 0 ? nodemailerAttachmentList : undefined,
        });

        return NextResponse.json({
          success: true,
          message: 'RFQ submitted successfully. We will contact you soon.'
        });
      } catch (nodemailerError) {
        console.error('Nodemailer failed:', nodemailerError);
        // Fall back to client-side submission
      }
    } else if (nodemailer) {
      console.warn('⚠️ Nodemailer is available but SMTP configuration is incomplete, skipping transporter setup.');
    }

    // Final fallback: return form data for client-side mailto
    const formDataObj: Record<string, any> = {
      name: name.trim(),
      email: email.trim(),
      country: typeof country === 'string' ? country.trim() : undefined,
      message: typeof message === 'string' ? message.trim() : undefined,
      source: typeof source === 'string' ? source.trim() : undefined,
      userAgent: request.headers.get('user-agent') ?? undefined,
    };

    return NextResponse.json({
      success: false,
      fallback: true,
      message: 'Server email services are unavailable. Please use your email client.',
      formData: formDataObj
    });
  } catch (error) {
    console.error('RFQ API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit RFQ. Please try again later.' },
      { status: 500 },
    );
  }
}
