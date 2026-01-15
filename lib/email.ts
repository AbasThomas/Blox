import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://bloxplatform.org/'; // Fallback to a likely production URL or placeholder

export async function sendWaitlistConfirmation(email: string, name: string) {
  const { data, error } = await resend.emails.send({
    from: 'Blox <onboarding@bloxplatform.org>',
    to: email,
    subject: "You're on the Blox waitlist! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Logo -->
            <div style="text-align: center; margin-bottom: 40px;">
              <img src="${baseUrl}/email_image.png" alt="Blox Logo" style="width: 48px; height: 48px; object-fit: contain;">
            </div>

            <!-- Main Content -->
            <div style="background-color: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px; text-align: center;">
              
              <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 0 0 16px 0;">You're on the list!</h1>
              
              <p style="color: #94A3B8; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                Thanks for joining the Blox waitlist, ${name}. You've secured your spot to experience the future of professional branding.
              </p>

              <!-- Minimal Info Box -->
              <div style="background-color: rgba(30, 206, 250, 0.05); border: 1px solid rgba(30, 206, 250, 0.1); border-radius: 12px; padding: 24px; margin: 32px 0;">
                <p style="color: #1ECEFA; font-size: 14px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">What's Next?</p>
                <p style="color: #CBD5E1; font-size: 15px; line-height: 1.5; margin: 0;">
                  We'll notify you as soon as your early access is ready.
                </p>
              </div>

              <!-- Social Links -->
              <div style="margin-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 32px;">
                <p style="color: #64748B; font-size: 13px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em;">Join our Community</p>
                
                <div style="display: inline-flex; gap: 12px;">
                  <!-- X (Twitter) -->
                  <a href="https://twitter.com/bloxplatform" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px 16px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: #94A3B8; font-size: 14px; font-weight: 500;">
                    <span style="display: block;">Follow on X</span>
                  </a>
                  
                  <!-- WhatsApp -->
                  <a href="https://wa.me/1234567890" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px 16px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: #94A3B8; font-size: 14px; font-weight: 500;">
                    <span style="display: block;">Join WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Simple Footer -->
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #475569; font-size: 12px;">
                © ${new Date().getFullYear()} Blox. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error('Failed to send waitlist email:', error);
    throw error;
  }

  return data;
}

export async function sendNewsletterWelcome(email: string) {
  const { data, error } = await resend.emails.send({
    from: 'Blox <newsletter@bloxplatform.org>',
    to: email,
    subject: 'Welcome to the Blox newsletter! 📬',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Logo -->
            <div style="text-align: center; margin-bottom: 40px;">
              <img src="${baseUrl}/email_image.png" alt="Blox Logo" style="width: 48px; height: 48px; object-fit: contain;">
            </div>

            <!-- Main Content -->
            <div style="background-color: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px; text-align: center;">
              
              <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 0 0 16px 0;">Welcome aboard!</h1>
              
              <p style="color: #94A3B8; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                You're now subscribed to the Blox newsletter. Expect high-signal updates about the future of professional identity.
              </p>

              <!-- Social Links -->
              <div style="margin-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 32px;">
                <p style="color: #64748B; font-size: 13px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em;">Join our Community</p>
                
                <div style="display: inline-flex; gap: 12px;">
                  <!-- X (Twitter) -->
                  <a href="https://twitter.com/bloxplatform" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px 16px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: #94A3B8; font-size: 14px; font-weight: 500;">
                    <span style="display: block;">Follow on X</span>
                  </a>
                  
                  <!-- WhatsApp -->
                  <a href="https://wa.me/1234567890" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px 16px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: #94A3B8; font-size: 14px; font-weight: 500;">
                    <span style="display: block;">Join WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Simple Footer -->
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #475569; font-size: 12px;">
                © ${new Date().getFullYear()} Blox. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error('Failed to send newsletter email:', error);
    throw error;
  }

  return data;
}
