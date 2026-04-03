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

    // Map tier string to stage context
    const stageMap: Record<string, { label: string; desc: string; color: string }> = {
      'Stage 1': { label: 'Stage 1 — Discovery', desc: 'You\'re at the start of your AI journey. The businesses that move now will hold a real advantage in 12–18 months.', color: '#c0392b' },
      'Stage 2': { label: 'Stage 2 — ChatGPT Plateau', desc: 'You\'re experimenting, but AI hasn\'t yet made it into your core operations. The gap between pilot and production is where most businesses stall.', color: '#d4712a' },
      'Stage 3': { label: 'Stage 3 — Systematically Enabled', desc: 'AI is working in parts of your business. The challenge now is connecting the pieces into systems that scale.', color: '#b5943a' },
      'Stage 4': { label: 'Stage 4 — Fully AI-Native', desc: 'You\'re operating at the frontier of business AI adoption. The focus now is compounding your advantages and systematically measuring ROI.', color: '#2e8b57' },
    };

    // Try to find the matching stage by checking if tier starts with a known stage key
    const stageKey = Object.keys(stageMap).find(k => data.tier.startsWith(k));
    const stage = stageKey ? stageMap[stageKey] : { label: data.tier, desc: '', color: '#B5654A' };

    const recsHtml = data.recommendations
      .map((r, i) => `<tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#f5e8e2;color:#B5654A;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:10px;flex-shrink:0;">${i + 1}</span><span style="color:#4b5563;font-size:14px;line-height:1.55;">${r}</span></td></tr>`)
      .join('');

    await client.emails.send({
      from: fromEmail,
      to: data.email,
      subject: `Your AI Readiness Score: ${data.score}/100 — ${stage.label}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#FAFAF8;border-radius:16px;overflow:hidden;border:1px solid #e8e5e0;">

          <!-- Header -->
          <div style="background:#1c1215;padding:28px 32px;">
            <p style="color:rgba(255,255,255,0.55);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 4px;">Tech Horizon Labs</p>
            <p style="color:white;font-size:18px;font-weight:600;margin:0;">AI Readiness Assessment Results</p>
          </div>

          <!-- Score band -->
          <div style="background:#f5e8e2;padding:28px 32px;text-align:center;border-bottom:1px solid #e8e5e0;">
            <p style="font-size:13px;color:#7a5a50;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;margin:0 0 8px;">Hi ${data.name}, your score is</p>
            <p style="font-size:64px;font-weight:700;color:#B5654A;line-height:1;margin:0 0 4px;">${data.score}</p>
            <p style="font-size:14px;color:#7a5a50;margin:0 0 16px;">out of 100</p>
            <div style="display:inline-block;background:white;border:1px solid #e8e5e0;border-radius:8px;padding:8px 20px;">
              <p style="margin:0;font-size:13px;font-weight:700;color:${stage.color};">${stage.label}</p>
            </div>
          </div>

          <!-- Stage description -->
          <div style="padding:24px 32px;border-bottom:1px solid #e8e5e0;">
            <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0;">${stage.desc}</p>
          </div>

          <!-- Recommendations -->
          <div style="padding:24px 32px;border-bottom:1px solid #e8e5e0;">
            <p style="font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#1c1215;margin:0 0 12px;">Your recommended next steps</p>
            <table style="width:100%;border-collapse:collapse;">
              ${recsHtml}
            </table>
          </div>

          <!-- Book CTA -->
          <div style="background:#1c1215;padding:28px 32px;text-align:center;">
            <p style="color:white;font-size:16px;font-weight:600;margin:0 0 8px;">Want to compress your timeline?</p>
            <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:0 0 20px;line-height:1.5;">Book a free 15-minute pre-discovery call. We'll map your highest-value AI starting point and give you a clear plan.</p>
            <a href="https://app.klipycrm.com/book/pre-discovery/free-pre-discovery" style="display:inline-block;background:#B5654A;color:#ffffff;padding:13px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Book a Free 15-Min Call</a>
          </div>

          <!-- Report CTA -->
          <div style="padding:20px 32px;background:#fdf7f4;border-top:1px solid #e8e5e0;">
            <p style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#B5654A;margin:0 0 4px;">Free Report</p>
            <p style="font-size:14px;color:#1c1215;font-weight:600;margin:0 0 4px;">State of AI Readiness: Australian SMB 2026</p>
            <p style="font-size:13px;color:#4b5563;margin:0 0 12px;line-height:1.5;">Benchmark your results against 54 surveyed Australian businesses. $44B GDP opportunity, 5% fully enabled.</p>
            <a href="https://techhorizonlabs.com/report" style="display:inline-block;background:#B5654A;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">Download free report</a>
          </div>

          <!-- Footer -->
          <div style="padding:16px 32px;text-align:center;">
            <p style="color:#9ca3af;font-size:11px;margin:0;">Tech Horizon Labs · Noosa Heads, QLD · <a href="https://techhorizonlabs.com" style="color:#9ca3af;">techhorizonlabs.com</a></p>
          </div>

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
