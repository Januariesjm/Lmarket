// controllers/linkController.js
const authController = require('./authController');
const Link = require('../models/linkModel');


const linkController = {
  submitLink: async (req, res) => {
    try {
      // Ensure the user is authenticated
      const userId = authController.authenticateUser(req, res);

      // Extract link from request body
      const { link } = req.body;

      // Add logic to process the link (e.g., store it in the database)
      const newLink = new Link({ url: link, user: userId });
      await newLink.save();

      // For simplicity, let's just return a success message
      return res.status(200).json({ message: 'Link submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllLinks: async (req, res) => {
    try {
      const allLinks = await Link.find();
      res.status(200).json(allLinks);
    } catch (error) {
      console.error('Error fetching links:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  watchLink: async (req, res) => {
    try {
      const { linkId } = req.body;

      // Get the link from the database
      const link = await Link.findById(linkId);

      if (!link) {
        return res.status(404).json({ message: 'Link not found' });
      }

      // Simulate watching the link for one minute (60 seconds)
      // In a real-world scenario, you might want to implement a more accurate time-tracking mechanism
      await new Promise(resolve => setTimeout(resolve, 60000));

      // Increment the watches count
      link.watches = (link.watches || 0) + 1;

      // Save the updated link
      await link.save();

      res.status(200).json({ message: 'Link watched successfully' });
    } catch (error) {
      console.error('Error watching link:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  interactionLink: async (req, res) => {
    try {
      const { linkId, interactionType, interactionTime } = req.body;

      // Get the link from the database
      const link = await Link.findById(linkId);

      if (!link) {
        return res.status(404).json({ message: 'Link not found' });
      }

      // Increment the clicks or watches count based on the interactionType
      if (interactionType === 'click') {
        link.clicks = (link.clicks || 0) + 1;
      } else if (interactionType === 'watch') {
        link.watches = (link.watches || 0) + 1;
      }

      // Save the updated link
      await link.save();

      // Update the user's submitted link with the corresponding click or watch
      // You may need to implement this logic based on your user and link models
      // For example, update the user's submittedLinks array with the interaction data

      res.status(200).json({ message: `Link ${interactionType}ed successfully` });
    } catch (error) {
      console.error(`Error ${interactionType === 'click' ? 'clicking' : 'watching'} link:`, error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getUserLinks: async (req, res) => {
    try {
      // Ensure the user is authenticated
      const userId = authController.authenticateUser(req, res);

      // Fetch links for the specified user
      const userLinks = await Link.find({ user: userId });

      res.status(200).json(userLinks);
    } catch (error) {
      console.error('Error fetching user links:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

// src/controllers/linkController.js



module.exports = linkController;
