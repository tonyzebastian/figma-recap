const express = require('express');
const {
    fetchActivityFeed,
    fetchActivityFeedByProjectId,
    fetchActivityFeedByFileKey,
} = require('../services/figmaService');

const router = express.Router();

// Middleware to validate the presence of the API token
router.use((req, res, next) => {
    const apiToken = req.headers['x-figma-token'];
    if (!apiToken) {
        return res.status(400).json({ error: 'Missing API token in request headers' });
    }
    req.apiToken = apiToken; // Attach the token to the request object for downstream usage
    next();
});

// Route to handle teamId
router.get('/:teamId', async (req, res) => {
    try {
        const teamId = req.params.teamId;

        if (!teamId) {
            return res.status(400).json({ error: 'Team ID is required' });
        }

        const editCount = await fetchActivityFeed(teamId, req.apiToken);
        res.json({ editCount });
    } catch (error) {
        console.error('Error fetching activity for team ID:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route to handle projectId
router.get('/project/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;

        if (!projectId) {
            return res.status(400).json({ error: 'Project ID is required' });
        }

        const editCount = await fetchActivityFeedByProjectId(projectId, req.apiToken);
        res.json({ editCount });
    } catch (error) {
        console.error('Error fetching activity for project ID:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route to handle fileKey
router.get('/file/:fileKey', async (req, res) => {
    try {
        const fileKey = req.params.fileKey;

        if (!fileKey) {
            return res.status(400).json({ error: 'File key is required' });
        }

        const editCount = await fetchActivityFeedByFileKey(fileKey, req.apiToken);
        res.json({ editCount });
    } catch (error) {
        console.error('Error fetching activity for file key:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;