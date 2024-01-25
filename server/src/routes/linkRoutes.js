const express = require('express');
const linkController = require('../controllers/linkController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/submit', authController.authenticateUser, linkController.submitLink);
router.get('/links', linkController.getAllLinks);
router.post('/watch-link', authController.authenticateUser, linkController.watchLink);
router.post('/interaction', authController.authenticateUser, linkController.interactionLink);
router.get('/users/links', authController.authenticateUser, linkController.getUserLinks);

module.exports = router;

