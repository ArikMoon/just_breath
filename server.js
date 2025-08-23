const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React Router - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`🫁 Breathing app server running at http://localhost:${port}`);
});
