const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('school/home', { title: 'N.R.K. Public School' });
});

router.get('/about', (req, res) => {
    res.render('school/about', { title: 'About the School' });
});

router.get('/principal-message', (req, res) => {
    res.render('school/principal', { title: 'Principal\'s Message' });
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
    res.render('school/contact', { title: 'Contact Us' });
});

module.exports = router;
