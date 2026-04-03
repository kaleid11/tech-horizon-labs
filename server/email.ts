import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key, 
    fromEmail: connectionSettings.settings.from_email
  };
}

export async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: fromEmail
  };
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: fromEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    });
  } catch (error) {
    console.error('Failed to send contact notification:', error);
  }
}

export async function sendAuditResults(data: {
  email: string;
  name: string;
  score: number;
  tier: string;
  recommendations: string[];
}) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    const recsHtml = data.recommendations
      .map(r => `<li style="margin-bottom:8px;">${r}</li>`)
      .join('');

    await client.emails.send({
      from: fromEmail,
      to: data.email,
      subject: `Your AI Readiness Score: ${data.score}/100 — Tech Horizon Labs`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#381d2a;">Hi ${data.name},</h2>
          <p>Here are your AI Readiness Self-Assessment results:</p>

          <div style="background:#f9f8f4;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
            <div style="font-size:48px;font-weight:bold;color:#e76f51;">${data.score}</div>
            <div style="color:#6b7280;font-size:14px;">out of 100</div>
          </div>

          <p><strong>Recommended next step:</strong> ${data.tier}</p>

          <h3 style="color:#381d2a;">Your Personalised Recommendations</h3>
          <ul style="color:#4b5563;line-height:1.6;">${recsHtml}</ul>

          <div style="background:#381d2a;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
            <p style="color:white;margin-bottom:16px;">Ready to find your biggest bottleneck?</p>
            <a href="https://app.klipycrm.com/book/pre-discovery/free-pre-discovery" style="background:#B5654A;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Book a Free 15-Min Call</a>
          </div>

          <p style="color:#9ca3af;font-size:12px;">Tech Horizon Labs · Sunshine Coast, QLD · techhorizonlabs.com</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send audit results email:', error);
  }
}

export async function sendAuditNotification(data: {
  name: string;
  email: string;
  business: string;
  score: number;
  tier: string;
}) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    await client.emails.send({
      from: fromEmail,
      to: fromEmail,
      subject: `New Audit Submission: ${data.name} (${data.score}/100 → ${data.tier})`,
      html: `
        <h2>New AI Readiness Audit Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.business ? `<p><strong>Business:</strong> ${data.business}</p>` : ''}
        <p><strong>Score:</strong> ${data.score}/100</p>
        <p><strong>Suggested Tier:</strong> ${data.tier}</p>
      `
    });
  } catch (error) {
    console.error('Failed to send audit notification:', error);
  }
}

export async function sendContactAutoReply(data: {
  name: string;
  email: string;
}) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    await client.emails.send({
      from: fromEmail,
      to: data.email,
      reply_to: fromEmail,
      subject: `Got your message — Tech Horizon Labs`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
          <p style="font-size:1.1rem;margin-bottom:1rem;">Hi ${data.name},</p>
          <p style="color:#4a4a4a;line-height:1.6;margin-bottom:1rem;">Got your message. Huxley will review it and be in touch within one business day.</p>
          <p style="color:#4a4a4a;line-height:1.6;margin-bottom:2rem;">If you'd rather lock in a time now, you can book a free 15-minute pre-discovery call directly:</p>
          <div style="text-align:left;margin-bottom:2rem;">
            <a href="https://app.klipycrm.com/book/pre-discovery/free-pre-discovery"
               style="background:#B5654A;color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;font-size:0.9375rem;">
              Book a free 15-min call
            </a>
          </div>
          <p style="color:#7a7a7a;font-size:0.875rem;border-top:1px solid #eceae6;padding-top:1rem;margin-top:1rem;">
            Tech Horizon Labs &middot; Noosa Heads, Queensland &middot;
            <a href="https://techhorizonlabs.com" style="color:#B5654A;text-decoration:none;">techhorizonlabs.com</a>
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send contact auto-reply:', error);
  }
}

export async function sendReportDownloadEmail(data: { name: string; email: string }) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    await client.emails.send({
      from: fromEmail,
      to: data.email,
      reply_to: fromEmail,
      subject: `Your copy: State of AI Readiness — Australian SMB 2026`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
          <p style="font-size:1.05rem;margin-bottom:1rem;">Hi ${data.name},</p>
          <p style="color:#4a4a4a;line-height:1.6;margin-bottom:1rem;">Your copy of the <strong>State of AI Readiness: Australian SMB 2026</strong> report is ready to download.</p>
          <div style="text-align:left;margin:1.5rem 0;">
            <a href="https://techhorizonlabs.com/ai-readiness-report-2026.pdf"
               style="background:#B5654A;color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;font-size:0.9375rem;">
              Download the report (PDF)
            </a>
          </div>
          <p style="color:#4a4a4a;line-height:1.6;margin-bottom:1rem;">If you'd like to talk through where your business sits on the AI maturity spectrum, book a free 15-minute pre-discovery call:</p>
          <div style="text-align:left;margin-bottom:2rem;">
            <a href="https://app.klipycrm.com/book/pre-discovery/free-pre-discovery"
               style="background:transparent;color:#B5654A;padding:10px 0;border-bottom:2px solid #B5654A;text-decoration:none;font-weight:600;display:inline-block;font-size:0.9rem;">
              Book a free call →
            </a>
          </div>
          <p style="color:#7a7a7a;font-size:0.875rem;border-top:1px solid #eceae6;padding-top:1rem;margin-top:1rem;">
            Tech Horizon Labs &middot; Noosa Heads, Queensland &middot;
            <a href="https://techhorizonlabs.com" style="color:#B5654A;text-decoration:none;">techhorizonlabs.com</a>
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send report download email:', error);
  }
}

export async function sendNewsletterWelcome(email: string, source?: string) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    if (source === 'report-download') {
      await client.emails.send({
        from: fromEmail,
        to: email,
        reply_to: fromEmail,
        subject: 'Your copy: State of AI Readiness — Australian SMB 2026',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
            <p style="font-size:1.05rem;margin-bottom:1rem;">Thanks for downloading the report.</p>
            <p style="color:#4a4a4a;line-height:1.65;margin-bottom:1rem;">Australia ranks 7th globally for AI adoption per capita — but just 5% of Australian SMBs are fully AI-enabled. This report maps the four stages of AI maturity, the $44 billion GDP opportunity sitting unclaimed, and the real barriers preventing Queensland businesses from crossing from basic adoption to systematic integration. You'll find the data, the frameworks, and the concrete next steps.</p>
            <div style="margin-bottom:2rem;">
              <a href="https://techhorizonlabs.com/ai-readiness-report-2026.pdf"
                 style="background:#B5654A;color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;font-size:0.9375rem;">
                Download the report (PDF)
              </a>
            </div>
            <p style="color:#4a4a4a;line-height:1.65;margin-bottom:0.5rem;">Want to see where your business sits on the maturity curve? The free AI Readiness Assessment takes about 5 minutes and gives you a personalised score and recommendations:</p>
            <div style="margin-bottom:2rem;">
              <a href="https://techhorizonlabs.com/assessment"
                 style="color:#B5654A;text-decoration:none;font-weight:600;">
                Take the free assessment &rarr;
              </a>
            </div>
            <p style="color:#7a7a7a;font-size:0.875rem;border-top:1px solid #eceae6;padding-top:1rem;margin-top:1rem;">
              Tech Horizon Labs &middot; Noosa Heads, Queensland &middot;
              <a href="https://techhorizonlabs.com" style="color:#B5654A;text-decoration:none;">techhorizonlabs.com</a>
            </p>
          </div>
        `
      });
    } else {
      await client.emails.send({
        from: fromEmail,
        to: email,
        reply_to: fromEmail,
        subject: 'Welcome to Tech Horizon Labs Newsletter',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
            <p style="font-size:1.05rem;margin-bottom:1rem;">Thanks for subscribing.</p>
            <p style="color:#4a4a4a;line-height:1.65;margin-bottom:1rem;">We cover AI infrastructure, workflow automation, and what's actually working for Australian businesses. Practical, not hype.</p>
            <p style="color:#4a4a4a;line-height:1.65;margin-bottom:2rem;">If you have a question or want to talk through an AI project, just reply to this email.</p>
            <p style="color:#7a7a7a;font-size:0.875rem;border-top:1px solid #eceae6;padding-top:1rem;margin-top:1rem;">
              Tech Horizon Labs &middot; Noosa Heads, Queensland &middot;
              <a href="https://techhorizonlabs.com" style="color:#B5654A;text-decoration:none;">techhorizonlabs.com</a>
            </p>
          </div>
        `
      });
    }
  } catch (error) {
    console.error('Failed to send newsletter welcome:', error);
  }
}
