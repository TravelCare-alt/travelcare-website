const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'support.travelcare@gmail.com',
    pass: process.env.EMAIL_PASSWORD || '', // App-specific password
  },
});

// Test email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { email, subject, message, type } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // Email to support team
    const supportMailOptions = {
      from: 'support.travelcare@gmail.com',
      to: 'support.travelcare@gmail.com',
      subject: `New ${type || 'Support'} Request from ${email}`,
      html: `
        <h2>New Support Request</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'Chat Support'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Reply to: ${email}</em></p>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: 'support.travelcare@gmail.com',
      to: email,
      subject: 'We received your message - TravelCare Support',
      html: `
        <h2>Thank you for contacting TravelCare!</h2>
        <p>We've received your message and our support team will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>If you have any urgent issues, please use the emergency button in the app.</p>
        <p>Best regards,<br>TravelCare Support Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(supportMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully! We will respond within 24 hours.',
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    });
  }
});

// Chat support endpoint
app.post('/api/chat-support', async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    const mailOptions = {
      from: 'support.travelcare@gmail.com',
      to: 'support.travelcare@gmail.com',
      subject: `Chat Support Request from ${email}`,
      html: `
        <h2>Chat Support Escalation</h2>
        <p><strong>User Email:</strong> ${email}</p>
        <p><strong>Issue:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This user needs human support. Please respond to: ${email}</em></p>
      `,
    };

    const confirmationMail = {
      from: 'support.travelcare@gmail.com',
      to: email,
      subject: 'Support Request Received - TravelCare',
      html: `
        <h2>We're here to help!</h2>
        <p>Thank you for reaching out. Our support team has received your request and will contact you within 24 hours.</p>
        <p>In the meantime, feel free to explore our resources or try our AI chat assistant for quick answers.</p>
        <p>Best regards,<br>TravelCare Support Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMail);

    res.json({
      success: true,
      message: 'Your support request has been submitted. We will contact you soon!',
    });
  } catch (error) {
    console.error('Chat support error:', error);
    res.status(500).json({
      error: 'Failed to submit support request',
      details: error.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`TravelCare email server running on port ${PORT}`);
});
