// src/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/emailUtils');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate OTP
      const verificationOTP = Math.floor(100000 + Math.random() * 900000).toString();

      // Save user with hashed password and OTP
      const newUser = new User({
        email,
        password: hashedPassword,
        verificationOTP,
      });
      await newUser.save();

      // Send verification email with OTP
      const emailSubject = 'Verify Your Email';
      const emailText = `Your verification code is: ${verificationOTP}`;
      await sendEmail(email, emailSubject, emailText);

      res.status(201).json({ message: 'User registered. Check your email for verification.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email, otp } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if OTP is correct
      if (user.verificationOTP !== otp) {
        return res.status(400).json({ message: 'Incorrect OTP' });
      }

      // Check if OTP is expired (You may need to adjust your expiry logic)
      const currentTimestamp = Date.now();
      const otpTimestamp = user.verificationOTPTimestamp;
      const otpExpiry = 5 * 60 * 1000; // 5 minutes (adjust as needed)

      if (currentTimestamp - otpTimestamp > otpExpiry) {
        return res.status(400).json({ message: 'OTP has expired' });
      }

      // Update user's status and remove verification token
      user.isVerified = true;
      user.verificationOTP = undefined;
      user.verificationOTPTimestamp = undefined;
      await user.save();

      res.status(200).json({ message: 'Email verification successful. You can now login.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user
      const user = await User.findOne({ email });
      if (!user || !user.isVerified) {
        return res.status(401).json({ message: 'Invalid email or unverified account' });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = generateToken(user._id);

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  requestPasswordReset: async (req, res) => {
    try {
      const { email } = req.body;

      // Find the user
      const user = await User.findOne({ email, isVerified: true });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or unverified account' });
      }

      // Generate reset token and set expiration
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      // Send password reset email with reset token
      const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
      const emailSubject = 'Password Reset';
      const emailText = `To reset your password, click on the following link:\n\n${resetLink}`;
      await sendEmail(email, emailSubject, emailText);

      res.status(200).json({ message: 'Password reset email sent. Check your inbox.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;

      // Find the user by reset token and check expiration
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      // Hash the new password and update user
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = authController;
