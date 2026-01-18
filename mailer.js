const nodemailer = require('nodemailer');

// Create a transporter object using Zoho's SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtppro.zoho.in',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.ZOHO_USER, // Replace with your Zoho email
    pass: process.env.ZOHO_PASS // Replace with your Zoho password or app-specific password
  }
});

module.exports = transporter;
