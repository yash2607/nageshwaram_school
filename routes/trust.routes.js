const express = require('express');
const router = express.Router();
const { addTrustInquiry } = require('../database');
const transporter = require('../mailer');

router.get('/', (req, res) => {
    res.render('trust/home', { title: 'Nageshwaram Foundation Trust' });
});

router.get('/about', (req, res) => {
    res.render('trust/about', { title: 'About the Trust' });
});

router.get('/founder-and-trustees', (req, res) => {
    res.render('trust/founder', { title: 'Founder & Trustees' });
});

router.get('/vision-and-mission', (req, res) => {
    res.render('trust/vision', { title: 'Vision & Mission' });
});

router.get('/institutions', (req, res) => {
    res.render('trust/institutions', { title: 'Our Institutions' });
});

router.get('/careers', (req, res) => {
    res.render('trust/careers', { title: 'Careers' });
});

router.get('/contact', (req, res) => {
    res.render('trust/contact', { title: 'Contact Us', message: null });
});

router.post('/contact', (req, res) => {
    console.log('Received contact form submission:');
    console.log(req.body);

    const { name, email, subject, message } = req.body;
    const enquiryNumber = 'ENQ-' + Math.floor(100000 + Math.random() * 900000);
    const inquiry = {
        enquiryNumber,
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
    };

    // Save to database
    addTrustInquiry(inquiry);

    // Send email to admin
    const mailOptionsAdmin = {
        from: process.env.ZOHO_USER,
        to: 'info@nageshwaramtrust.org',
        subject: `New Inquiry from ${name} (Trust Contact Form)`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    // Send auto-reply to user
    const mailOptionsUser = {
        from: process.env.ZOHO_USER,
        to: email, // Sending right back to the user
        subject: `Thank you for contacting Nageshwaram Foundation Trust - Enquiry #${enquiryNumber}`,
        text: `Dear ${name},\n\nThank you for reaching out to us. We have received your query and our team will get back to you shortly.\n\nYour Enquiry Number is: ${enquiryNumber}\n\nYour Query:\nSubject: ${subject}\nMessage: ${message}\n\nBest Regards,\nNageshwaram Foundation Trust Team`
    };

    console.log('Attempting to send emails for Trust inquiry...');

    Promise.all([
        transporter.sendMail(mailOptionsAdmin),
        transporter.sendMail(mailOptionsUser)
    ]).then(results => {
        console.log('Emails sent successfully');
        res.render('trust/contact', { title: 'Contact Us', message: `Thank you for your message. Your enquiry number is ${enquiryNumber}. We have sent a confirmation email to you.` });
    }).catch(error => {
        console.error('Error sending emails:', error);
        res.render('trust/contact', { title: 'Contact Us', message: `Your enquiry has been recorded. Your enquiry number is ${enquiryNumber}. However, we could not send the confirmation email at this time. Please save your enquiry number for reference.` });
    });
});

module.exports = router;
