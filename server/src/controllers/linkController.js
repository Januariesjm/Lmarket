// controllers/linkController.js

const Link = require('../models/linkModel');

const linkController = {
  submitLink: async (req, res) => {
    try {
      const { link } = req.body;

      // Add logic to process the link (e.g., store it in the database)
      const newLink = new Link({ url: link });
      await newLink.save();

      // For simplicity, let's just return a success message
      return res.status(200).json({ message: 'Link submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = linkController;
