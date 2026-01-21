const express = require('express');
const router = express.Router();
const { addSchoolInquiry } = require('../database');
const transporter = require('../mailer');

router.get('/', (req, res) => {
    res.render('school/home', { title: 'N.R.K. Public School' });
});

router.get('/about', (req, res) => {
    res.render('school/about', { title: 'About the School' });
});

router.get('/directors-message', (req, res) => {
    res.render('school/director', { title: 'Director\'s Message' });
});

router.get('/academics', (req, res) => {
    res.render('school/academics', { title: 'Academics' });
});

router.get('/admissions', (req, res) => {
    res.render('school/admissions', { title: 'Admissions' });
});

router.get('/fees', (req, res) => {
    res.render('school/fees', { title: 'Fee Structure' });
});

router.get('/hostel', (req, res) => {
    res.render('school/hostel', { title: 'Hostel Facilities' });
});

router.get('/infrastructure', (req, res) => {
    res.render('school/infrastructure', { title: 'Infrastructure' });
});

router.get('/gallery', (req, res) => {
    res.render('school/gallery', { title: 'Gallery' });
});

router.get('/mandatory-disclosure', (req, res) => {
    res.render('school/disclosure', { title: 'Mandatory Disclosure' });
});

router.get('/contact', (req, res) => {
    res.render('school/contact', { title: 'Contact Us', message: null });
});

router.post('/contact', (req, res) => {
    console.log('Received school contact form submission:');
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
    addSchoolInquiry(inquiry);

    // Send email
    const mailOptions = {
        from: process.env.ZOHO_USER,
        to: 'info@nageshwaramtrust.org',
        subject: `New Inquiry from ${name} (School Contact Form)`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    console.log('Attempting to send school email with options:');
    console.log(mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.render('school/contact', { title: 'Contact Us', message: 'Something went wrong. Please try again.' });
        } else {
            console.log('Email sent:', info);
            res.render('school/contact', { title: 'Contact Us', message: 'Thank you for your message. We will get back to you soon.' });
        }
    });
});

module.exports = router;
