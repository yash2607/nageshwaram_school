require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

// Read JSON data once on server startup
const circularsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'circulars.json'), 'utf8'));
const galleryData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'gallery.json'), 'utf8'));
const videosData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'videos.json'), 'utf8'));

const app = express();
const port = 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));


// Routes
const trustRoutes = require('./routes/trust.routes');
const schoolRoutes = require('./routes/school.routes');

app.use('/', trustRoutes);
app.use('/school', schoolRoutes);

// API routes from legacy server
app.get('/api/circulars', (req, res) => {
  res.json(circularsData);
});

app.get('/api/gallery', (req, res) => {
  res.json(galleryData);
});

app.get('/api/videos', (req, res) => {
    res.json(videosData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});