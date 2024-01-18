// models/linkModel.js

const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
