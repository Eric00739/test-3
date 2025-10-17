/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from 'next/server';

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

function ensureEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// Resend API function for static environments
async function sendEmailWithResend(emailData: {
  to: string;
  from: string;
  subject: string;
  text: string;
  attachments?: any[];
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: emailData.from,
      to: [emailData.to],
      subject: emailData.subject,
      text: emailData.text,
      attachments: emailData.attachments,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return response.json();
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
}) {
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
  
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('EmailJS configuration is missing');
  }

  // Extract form data from the text
  const nameMatch = emailData.text.match(/Name: (.+)/);
  const emailMatch = emailData.text.match(/Email: (.+)/);
  const messageMatch = emailData.text.match(/Message: ([\s\S]+)/);
  
  const templateParams = {
    from_name: nameMatch?.[1] || 'Unknown',
    from_email: emailMatch?.[1] || emailData.from,
    to_email: emailData.to,
    subject: emailData.subject,
    message: messageMatch?.[1] || emailData.text,
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
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
    const formData = await request.formData();

    const honeypot = formData.get('website');
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
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

    // Try to send email using various services in order of preference
    // 1. Resend API (paid, but reliable)
    if (process.env.RESEND_API_KEY) {
      try {
        await sendEmailWithResend({
          from: process.env.RESEND_FROM_EMAIL || ensureEnv('RFQ_FROM_EMAIL'),
          to: ensureEnv('RFQ_TO_EMAIL'),
          subject: 'New RFQ submission',
          text: emailContent,
          attachments: attachmentList.length > 0 ? attachmentList : undefined,
        });

        return NextResponse.json({
          success: true,
          message: 'RFQ submitted successfully. We will contact you soon.'
        });
      } catch (resendError) {
        console.error('Resend API failed:', resendError);
        // Fall back to next service
      }
    }
    
    // 2. Formspree (free tier available - 50 submissions/month)
    if (process.env.FORMSPREE_FORM_ID) {
      try {
        await sendEmailWithFormspree({
          from: email.trim(),
          to: ensureEnv('RFQ_TO_EMAIL'),
          subject: 'New RFQ submission',
          text: emailContent,
          formId: process.env.FORMSPREE_FORM_ID,
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
    if (process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID && process.env.EMAILJS_PUBLIC_KEY) {
      try {
        await sendEmailWithEmailJS({
          from: email.trim(),
          to: ensureEnv('RFQ_TO_EMAIL'),
          subject: 'New RFQ submission',
          text: emailContent,
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
    if (nodemailer) {
      try {
        const smtpPort = Number(process.env.RFQ_SMTP_PORT ?? 587);

        const transporter = nodemailer.createTransport({
          host: ensureEnv('RFQ_SMTP_HOST'),
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: ensureEnv('RFQ_SMTP_USER'),
            pass: ensureEnv('RFQ_SMTP_PASS'),
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
          from: ensureEnv('RFQ_FROM_EMAIL'),
          to: ensureEnv('RFQ_TO_EMAIL'),
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
