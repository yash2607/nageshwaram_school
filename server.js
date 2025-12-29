const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const trustRoutes = require('./routes/trust.routes');
const schoolRoutes = require('./routes/school.routes');

app.use('/', trustRoutes);
app.use('/school', schoolRoutes);

// API routes from legacy server
app.get('/api/circulars', (req, res) => {
  const circularsData = fs.readFileSync(path.join(__dirname, 'data', 'circulars.json'));
  res.json(JSON.parse(circularsData));
});

app.get('/api/gallery', (req, res) => {
  const galleryData = fs.readFileSync(path.join(__dirname, 'data', 'gallery.json'));
  res.json(JSON.parse(galleryData));
});

app.get('/api/videos', (req, res) => {
    const videosData = fs.readFileSync(path.join(__dirname, 'data', 'videos.json'));
    res.json(JSON.parse(videosData));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});