// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const linkController = require('../controllers/linkController')
const authMiddleware = require('../middleware/authMiddleware'); // Destructure the function

const router = express.Router();

// Get user profile route - Requires user authentication
router.get('/profile', userController.getUserProfile);

// Update user profile route - Requires user authentication
router.patch('/profile', userController.updateUserProfile);

router.get('/user/links', linkController.getUserLinks);

module.exports = router;
