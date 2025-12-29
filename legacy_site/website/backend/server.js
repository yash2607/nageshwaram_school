const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

// Serve static files from the 'nageshwaram_school' directory
app.use(express.static(path.join(__dirname, '../nageshwaram_school')));

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../nageshwaram_school', 'index.html'));
});

// Explicitly serve index.html for the /index.html path
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../nageshwaram_school', 'index.html'));
    }
);

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
  console.log(`Backend server is running at http://localhost:${port}`);
});