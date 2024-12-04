// server.js
const express = require('express');
const path = require('path');
const activityRoutes = require('./src/routes/activity'); // Import your activity routes
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the activity routes for API requests
app.use('/api/activity', activityRoutes); // Adjust the base path as needed

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});