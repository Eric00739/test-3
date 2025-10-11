import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { Attachment } from 'nodemailer/lib/mailer';

export const runtime = 'nodejs';

const MAX_TOTAL_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB

function ensureEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
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

    const attachments = await Promise.all(
      formData.getAll('attachments').map(async (item, index) => {
        if (!(item instanceof File)) return null;

        const buffer = Buffer.from(await item.arrayBuffer());

        return {
          filename: item.name || `attachment-${index + 1}`,
          content: buffer,
          contentType: item.type || undefined,
        } satisfies Attachment;
      }),
    );

    const text = buildEmailContent({
      name: name.trim(),
      email: email.trim(),
      country: typeof country === 'string' ? country.trim() : undefined,
      message: typeof message === 'string' ? message.trim() : undefined,
      source: typeof source === 'string' ? source.trim() : undefined,
      userAgent: request.headers.get('user-agent') ?? undefined,
    });

    const attachmentList = attachments.filter(Boolean) as Attachment[];

    await transporter.sendMail({
      from: ensureEnv('RFQ_FROM_EMAIL'),
      to: ensureEnv('RFQ_TO_EMAIL'),
      replyTo: email.trim(),
      subject: 'New RFQ submission',
      text,
      attachments: attachmentList.length > 0 ? attachmentList : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('RFQ API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit RFQ. Please try again later.' },
      { status: 500 },
    );
  }
}
