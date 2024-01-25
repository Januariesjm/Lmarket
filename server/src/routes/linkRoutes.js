// routes/linkRoutes.js

const express = require('express');
const linkController = require('../controllers/linkController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/submit', linkController.submitLink);
router.get('/links', linkController.getAllLinks);
router.post('/watch-link', linkController.watchLink);
router.post('/interaction', linkController.interactionLink);
router.get('/users/links', linkController.getUserLinks);


module.exports = router;
