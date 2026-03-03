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
            <a href="https://cal.com/techhorizonlabs/discovery" style="background:#e76f51;color:#381d2a;padding:12px 32px;border-radius:999px;text-decoration:none;font-weight:bold;display:inline-block;">Book Free 15-Min Audit</a>
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

export async function sendNewsletterWelcome(email: string) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Welcome to Tech Horizon Labs Newsletter',
      html: `
        <h2>Welcome to Tech Horizon Labs!</h2>
        <p>Thanks for subscribing to our newsletter. We'll keep you updated on:</p>
        <ul>
          <li>Latest AI infrastructure insights</li>
          <li>MCP integration patterns</li>
          <li>Tech Horizon Academy updates</li>
          <li>Case studies and practical implementations</li>
        </ul>
        <p>Stay ahead of the curve.</p>
      `
    });
  } catch (error) {
    console.error('Failed to send newsletter welcome:', error);
  }
}
