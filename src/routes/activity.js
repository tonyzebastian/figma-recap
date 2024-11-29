const express = require('express');
const { fetchActivityFeed } = require('../services/figmaService');

const router = express.Router();

router.get('/:teamId', async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const editCount = await fetchActivityFeed(teamId);
        res.json({ editCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;