const express = require('express');
const { validateApiToken } = require('../middleware/auth');
const figmaController = require('../controllers/figmaController');

const router = express.Router();

// Apply middleware to all routes
router.use(validateApiToken);

// New endpoint for fetching personal ID and user name
router.get('/personalId', figmaController.getPersonalId); // Use the new controller method

// Routes
router.get('/:teamId', figmaController.getTeamActivity);
router.get('/project/:projectId', figmaController.getProjectActivity);
router.get('/file/:fileKey', figmaController.getFileActivity);

module.exports = router;