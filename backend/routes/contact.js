import express from 'express';
import nodemailer from 'nodemailer';
import { addToGoogleSheetViaAppsScript } from '../services/googleAppsScript.js';

const router = express.Router();

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });
};

// POST /api/contact - Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required (name, email, message)',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    const timestamp = new Date().toISOString();

    // Send confirmation email to user
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: `"Supe AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank You for Contacting Supe AI',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #146EE9;">Thank You for Contacting Us!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Supe AI. We have received your message and will get back to you soon.</p>
            <p>We appreciate your interest and look forward to assisting you.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated confirmation email. Please do not reply to this email.
            </p>
            <p style="color: #666; font-size: 12px;">
              Best regards,<br>
              The Supe AI Team
            </p>
          </div>
        `,
        text: `Thank you for contacting Supe AI, ${name}. We have received your message and will get back to you soon.`,
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Confirmation email sent to:', email);
    } catch (emailError) {
      console.error('❌ Error sending confirmation email:', emailError);
      // Continue even if email fails - we still want to log to Google Sheets
    }

    // Log to Google Sheets via Apps Script
    let sheetsSuccess = false;
    try {
      await addToGoogleSheetViaAppsScript({
        name,
        email,
        message,
        timestamp,
      });
      console.log('✅ Contact form data logged to Google Sheets via Apps Script');
      sheetsSuccess = true;
    } catch (sheetsError) {
      console.error('❌ Error logging to Google Sheets:', sheetsError.message);
      
      // Fallback: Send admin notification email if Sheets fails
      try {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
        
        if (adminEmail) {
          const transporter = createTransporter();
          
          const adminMailOptions = {
            from: `"Supe AI Contact Form" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `⚠️ New Contact Form Submission (Sheets Failed) - ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #ff6b6b; border-radius: 8px; background-color: #fff5f5;">
                <h2 style="color: #ff6b6b; margin-top: 0;">⚠️ New Contact Form Submission</h2>
                <p style="color: #666; font-size: 14px; background-color: #ffe0e0; padding: 10px; border-radius: 4px; margin: 10px 0;">
                  <strong>Note:</strong> This submission could not be saved to Google Sheets. Please save this information manually.
                </p>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
                  <h3 style="color: #146EE9; margin-top: 0;">Contact Details:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #333; width: 120px;">Name:</td>
                      <td style="padding: 8px 0; color: #666;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                      <td style="padding: 8px 0; color: #666;">
                        <a href="mailto:${email}" style="color: #146EE9; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
                      <td style="padding: 8px 0; color: #666; white-space: pre-wrap;">${message}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #333;">Timestamp:</td>
                      <td style="padding: 8px 0; color: #666;">${new Date(timestamp).toLocaleString()}</td>
                    </tr>
                  </table>
                </div>
                
                <div style="background-color: #fff3cd; padding: 10px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #ffc107;">
                  <p style="margin: 0; color: #856404; font-size: 13px;">
                    <strong>Error Details:</strong> ${sheetsError.message || 'Google Sheets authentication failed'}
                  </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  This is an automated notification from the Supe AI contact form system.
                </p>
              </div>
            `,
            text: `
⚠️ New Contact Form Submission (Sheets Failed)

Note: This submission could not be saved to Google Sheets. Please save this information manually.

Contact Details:
Name: ${name}
Email: ${email}
Message: ${message}
Timestamp: ${new Date(timestamp).toLocaleString()}

Error: ${sheetsError.message || 'Google Sheets authentication failed'}
            `.trim(),
          };

          await transporter.sendMail(adminMailOptions);
          console.log('✅ Admin notification email sent (fallback mechanism)');
        } else {
          console.warn('⚠️ ADMIN_EMAIL not configured. Cannot send fallback notification.');
        }
      } catch (fallbackEmailError) {
        console.error('❌ Error sending fallback admin email:', fallbackEmailError.message);
        // Don't throw - we've already logged the error
      }
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We have received it and will contact you soon.',
    });
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while processing your request. Please try again later.',
    });
  }
});

export default router;

