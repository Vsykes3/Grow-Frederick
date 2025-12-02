// Optional resend package - loaded dynamically to avoid build-time errors
let resend: any = null;

async function getResend() {
  if (resend !== null) return resend;
  try {
    // Use Function constructor to avoid webpack resolution
    const resendModule = await new Function('return import("resend")')();
    const { Resend } = resendModule;
    resend = new Resend(process.env.RESEND_API_KEY);
    return resend;
  } catch (e) {
    // resend package not installed - will use mock responses
    resend = false; // Mark as unavailable
    return null;
  }
}

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailTemplate) {
  try {
    const resendClient = await getResend();
    if (!resendClient || !process.env.RESEND_API_KEY) {
      console.log('Email not sent - RESEND_API_KEY not configured or resend package not installed');
      return { success: true, id: 'mock-id' };
    }

    const { data, error } = await resendClient.emails.send({
      from: 'GrowCommon <noreply@growcommon.com>',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
}

export async function sendReminderEmail(
  userEmail: string,
  userName: string,
  eventTitle: string,
  eventDate: string
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #414535;">Garden Reminder</h2>
      <p>Hello ${userName},</p>
      <p>This is a reminder for your garden task:</p>
      <div style="background-color: #f9f0dd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #9EBB8C; margin-top: 0;">${eventTitle}</h3>
        <p><strong>Date:</strong> ${eventDate}</p>
      </div>
      <p>Happy gardening!</p>
      <p>— The GrowCommon Team</p>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: `Garden Reminder: ${eventTitle}`,
    html,
  });
}

export async function sendDailyTipEmail(
  userEmail: string,
  userName: string,
  tip: string
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #414535;">Daily Garden Tip</h2>
      <p>Hello ${userName},</p>
      <div style="background-color: #f9f0dd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #9EBB8C; margin-top: 0;">Today's Tip</h3>
        <p>${tip}</p>
      </div>
      <p>Keep up the great work in your garden!</p>
      <p>— The GrowCommon Team</p>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: 'Your Daily Garden Tip',
    html,
  });
}

export async function sendWeatherAlertEmail(
  userEmail: string,
  userName: string,
  alert: string
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Weather Alert</h2>
      <p>Hello ${userName},</p>
      <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
        <h3 style="color: #dc2626; margin-top: 0;">Important Weather Notice</h3>
        <p>${alert}</p>
      </div>
      <p>Please take necessary precautions for your garden.</p>
      <p>— The GrowCommon Team</p>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: 'Weather Alert for Your Garden',
    html,
  });
}










