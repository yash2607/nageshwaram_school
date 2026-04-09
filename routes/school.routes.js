const express = require('express');
const router = express.Router();
const { addSchoolInquiry, addSchoolEnquiry } = require('../database');
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
    addSchoolInquiry(inquiry);

    // Send email to admin
    const mailOptionsAdmin = {
        from: process.env.ZOHO_USER,
        to: 'info@nageshwaramtrust.org',
        subject: `New Inquiry from ${name} (School Contact Form)`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    // Send auto-reply to user
    const mailOptionsUser = {
        from: process.env.ZOHO_USER,
        to: email, // Sending right back to the user
        subject: `Thank you for contacting N.R.K. Public School - Enquiry #${enquiryNumber}`,
        text: `Dear ${name},\n\nThank you for reaching out to us. We have received your query and our school admissions team will get back to you shortly.\n\nYour Enquiry Number is: ${enquiryNumber}\n\nYour Query:\nSubject: ${subject}\nMessage: ${message}\n\nBest Regards,\nN.R.K. Public School Team`
    };

    console.log('Attempting to send emails for School inquiry...');

    Promise.all([
        transporter.sendMail(mailOptionsAdmin),
        transporter.sendMail(mailOptionsUser)
    ]).then(results => {
        console.log('Emails sent successfully');
        res.render('school/contact', { title: 'Contact Us', message: `Thank you for your message. Your enquiry number is ${enquiryNumber}. We have sent a confirmation email to you.` });
    }).catch(error => {
        console.error('Error sending emails:', error);
        res.render('school/contact', { title: 'Contact Us', message: `Your enquiry has been recorded. Your enquiry number is ${enquiryNumber}. However, we could not send the confirmation email at this time. Please save your enquiry number for reference.` });
    });
});

// Floating Enquire Now modal - AJAX endpoint
router.post('/enquiry', express.json(), (req, res) => {
    console.log('Received school enquiry form submission:');
    console.log(req.body);

    const { name, email, phone, studentClass, message } = req.body;

    // Validation
    if (!name || !email || !phone || !studentClass || !message) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ''))) {
        return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit phone number.' });
    }

    const enquiryNumber = 'ENQ-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90);
    const enquiry = {
        enquiryNumber,
        name,
        email,
        phone,
        studentClass,
        message,
        date: new Date().toISOString()
    };

    // Save to database
    addSchoolEnquiry(enquiry);

    // Send email to admin
    const mailOptionsAdmin = {
        from: process.env.ZOHO_USER,
        to: 'info@nageshwaramtrust.org',
        subject: `New Enquiry Received - ${name}`,
        text: `New Enquiry from Website\n\nEnquiry Number: ${enquiryNumber}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nStudent Class: ${studentClass}\nMessage: ${message}\nDate: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
    };

    // Send auto-reply to user
    const mailOptionsUser = {
        from: process.env.ZOHO_USER,
        to: email,
        subject: `Enquiry Received – N.R.K. Public School [${enquiryNumber}]`,
        text: `Dear ${name},\n\nThank you for your enquiry at N.R.K. Public School.\n\nYour Enquiry Number: ${enquiryNumber}\n\nDetails Submitted:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nClass Interested In: ${studentClass}\nMessage: ${message}\n\nOur admissions team will contact you shortly.\n\nWarm Regards,\nN.R.K. Public School\nA Unit of Nageshwaram Foundation Trust`
    };

    console.log('Attempting to send enquiry emails...');

    Promise.all([
        transporter.sendMail(mailOptionsAdmin),
        transporter.sendMail(mailOptionsUser)
    ]).then(() => {
        console.log('Enquiry emails sent successfully');
        res.json({ success: true, enquiryNumber, emailSent: true });
    }).catch(error => {
        console.error('Error sending enquiry emails:', error);
        // Still return success with enquiry number even if email fails
        res.json({ success: true, enquiryNumber, emailSent: false });
    });
});

module.exports = router;
