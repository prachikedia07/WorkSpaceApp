// src/lib/email.js
import nodemailer from "nodemailer";

export function createEmailTransporter() {
  // Using Gmail with App Password
  // Make sure EMAIL_USER and EMAIL_PASSWORD are in .env.local
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// Keep your existing HTML template - full version below
export function getInvitationEmailHTML(data) {
  const { inviterName, workspaceName, message, inviteLink } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            padding: 40px 30px;
          }
          .content p {
            font-size: 16px;
            color: #4b5563;
            margin: 0 0 20px 0;
          }
          .workspace-name {
            color: #14b8a6;
            font-weight: 600;
          }
          .message-box {
            background: #f0fdfa;
            border-left: 4px solid #14b8a6;
            padding: 20px;
            margin: 24px 0;
            border-radius: 8px;
          }
          .message-box p {
            margin: 0;
            font-style: italic;
            color: #0f766e;
          }
          .button-container {
            text-align: center;
            margin: 32px 0;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
            color: white !important;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
            transition: all 0.3s ease;
          }
          .button:hover {
            box-shadow: 0 6px 16px rgba(20, 184, 166, 0.4);
            transform: translateY(-2px);
          }
          .footer {
            background: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            font-size: 14px;
            color: #6b7280;
            margin: 8px 0;
          }
          .warning {
            color: #dc2626;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🎉 You've Been Invited!</h1>
          </div>
          
          <div class="content">
            <p>
              <strong>${inviterName}</strong> has invited you to collaborate on 
              <span class="workspace-name">${workspaceName}</span>.
            </p>
            
            ${message ? `
              <div class="message-box">
                <p><strong>Personal Message:</strong></p>
                <p>"${message}"</p>
              </div>
            ` : ''}
            
            <p>Click the button below to create your account and join the workspace:</p>
            
            <div class="button-container">
              <a href="${inviteLink}" class="button">Accept Invitation & Sign Up</a>
            </div>
            
            <p style="font-size: 14px; color: #6b7280;">
              Or copy and paste this link into your browser:<br>
              <a href="${inviteLink}" style="color: #14b8a6; word-break: break-all;">${inviteLink}</a>
            </p>
          </div>
          
          <div class="footer">
            <p><strong>Already have an account?</strong></p>
            <p>Simply log in to see this invitation in your notifications.</p>
            <p class="warning">⏰ This invitation expires in 7 days.</p>
            <p style="margin-top: 20px;">
              If you didn't expect this invitation, you can safely ignore this email.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendInvitationEmail(to, data) {
  try {
    const transporter = createEmailTransporter();
    // Optional verify step (helps debug connection)
    // await transporter.verify(); // uncomment if you want to actively verify (useful in test script)

    const mailOptions = {
      from: `"${process.env.APP_NAME || "Team Finance"}" <${process.env.EMAIL_USER}>`,
      to,
      subject: `${data.inviterName} invited you to join ${data.workspaceName}`,
      html: getInvitationEmailHTML(data),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

export async function sendTestEmail(to) {
  try {
    const transporter = createEmailTransporter();
    const info = await transporter.sendMail({
      from: `"${process.env.APP_NAME || "Team Finance"}" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Test Email from Team Finance",
      html: "<h1>It works! 🎉</h1><p>Your email configuration is working correctly.</p>",
    });
    console.log("✅ Test email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Test email error:", error);
    return { success: false, error: error.message || String(error) };
  }
}
