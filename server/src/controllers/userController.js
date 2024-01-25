// userController.js
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set your desired upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const userController = {
  getUserProfile: async (req, res) => {
    try {
      const userId = req.user._id;

      // Fetch user details excluding sensitive information
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const userId = req.user._id;
      const { email } = req.body;

      let profileImage;
      if (req.file) {
        profileImage = req.file.path; // Use the file path or URL based on your setup
      }

      // Update user details and profile image
      const user = await User.findByIdAndUpdate(
        userId,
        { email, profileImage },
        { new: true }
      ).select('-password');

      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;
