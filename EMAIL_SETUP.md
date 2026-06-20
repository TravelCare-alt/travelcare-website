# TravelCare Email Setup Guide

## Overview
The TravelCare website now has a fully functional email system that sends emails from the chat widget and contact form to `support.travelcare@gmail.com`.

## Setup Instructions

### Step 1: Create Gmail App Password
Since Gmail requires app-specific passwords for third-party applications:

1. Go to https://myaccount.google.com/
2. Click "Security" in the left menu
3. Enable "2-Step Verification" (if not already enabled)
4. Go back to Security
5. Find "App passwords" (appears after 2-Step is enabled)
6. Select "Mail" and "Windows Computer" (or your device)
7. Google will generate a 16-character password
8. Copy this password

### Step 2: Configure Environment Variables
Update the `.env` file with your Gmail credentials:

```
EMAIL_USER=support.travelcare@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
PORT=3001
NODE_ENV=production
```

### Step 3: Install Dependencies
```bash
cd /home/ubuntu/travelcare-website
npm install
```

### Step 4: Start the Server
```bash
npm start
```

The server will run on `http://localhost:3001`

## How It Works

### Chat Widget Email Flow
1. User clicks "Need to talk to a human?"
2. User enters their email address
3. User clicks "Submit Request"
4. Email is sent to `support.travelcare@gmail.com` with conversation history
5. Confirmation email is sent to the user
6. User sees success message

### Contact Form Email Flow
1. User fills out contact form
2. User clicks "Send Message"
3. Email is sent to `support.travelcare@gmail.com` with form details
4. Confirmation email is sent to the user
5. User sees success message

## Email Templates

### Support Request Email (to admin)
- Contains user's email
- Contains full conversation history or message
- Includes user's email for reply

### Confirmation Email (to user)
- Confirms receipt of message
- Sets expectation of 24-hour response
- Provides next steps

## Testing

### Test Chat Widget
1. Open website
2. Click chat bubble (💬)
3. Ask a question (AI responds)
4. Click "Need to talk to a human?"
5. Enter your email
6. Click "Submit Request"
7. Check your email for confirmation

### Test Contact Form
1. Scroll to "Contact Us" section
2. Fill out the form
3. Click "Send Message"
4. Check your email for confirmation

## Troubleshooting

### Emails not sending?
1. Check `.env` file has correct credentials
2. Verify Gmail app password (not regular password)
3. Check server logs for errors
4. Ensure 2-Step Verification is enabled on Gmail

### Wrong email address?
1. Update `.env` file
2. Restart server
3. Test again

### Need to change email?
1. Update `EMAIL_USER` in `.env`
2. Restart server
3. Test with new email

## Security Notes
- Never commit `.env` file to version control
- Keep app password secure
- Consider using environment variables in production
- Emails are sent via Gmail's secure SMTP server

## Next Steps
- Deploy to production server
- Set up email monitoring
- Create email templates for different scenarios
- Add email logging/history
