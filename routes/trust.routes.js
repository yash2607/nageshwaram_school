const express = require('express');
const router = express.Router();

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
    res.render('trust/contact', { title: 'Contact Us' });
});

module.exports = router;
