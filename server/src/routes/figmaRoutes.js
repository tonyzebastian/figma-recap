const express = require('express');
const { validateApiToken } = require('../middleware/auth');
const figmaController = require('../controllers/figmaController');

const router = express.Router();

// Apply middleware to all routes
router.use(validateApiToken);

// Routes
router.get('/:teamId', figmaController.getTeamActivity);
router.get('/project/:projectId', figmaController.getProjectActivity);
router.get('/file/:fileKey', figmaController.getFileActivity);

module.exports = router;