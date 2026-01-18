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
    const inquiry = {
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
    };

    // Save to database
    addTrustInquiry(inquiry);

    // Send email
    const mailOptions = {
        from: process.env.ZOHO_USER,
        to: 'info@nageshwaramtrust.org',
        subject: `New Inquiry from ${name} (Trust Contact Form)`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    console.log('Attempting to send email with options:');
    console.log(mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.render('trust/contact', { title: 'Contact Us', message: 'Something went wrong. Please try again.' });
        } else {
            console.log('Email sent:', info);
            res.render('trust/contact', { title: 'Contact Us', message: 'Thank you for your message. We will get back to you soon.' });
        }
    });
});

module.exports = router;
