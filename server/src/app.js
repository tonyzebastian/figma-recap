const express = require('express');
const path = require('path');
const cors = require('cors');
const figmaRoutes = require('./routes/figmaRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', figmaRoutes);

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
}

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;