const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Configure SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sgMail;
