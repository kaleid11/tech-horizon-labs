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
