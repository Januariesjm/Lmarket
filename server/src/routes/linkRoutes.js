// routes/linkRoutes.js

const express = require('express');
const linkController = require('../controllers/linkController');

const router = express.Router();

router.post('/submit', linkController.submitLink);

module.exports = router;
