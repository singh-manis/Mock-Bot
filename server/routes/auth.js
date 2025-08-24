const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../utils/cloudinaryStorage');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Register
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    console.log('Registration attempt for:', { name, email });
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    const existingUser = await User.findOne({ email });
    console.log('Existing user check:', existingUser ? 'User exists' : 'No existing user');
    
    if (existingUser) {
      console.log('Email already in use:', email);
      return res.status(400).json({ message: 'Email already in use.' });
    }
    
    console.log('Creating new user...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');
    
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log('User created successfully:', { id: user._id, name: user.name, email: user.email });
    
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      console.log('Password does not match for user:', email);
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    
    console.log('Login successful for user:', email);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update Profile (Protected Route)
router.put('/update-profile', auth, async (req, res) => {
  try {
    const { name, email, imageUrl } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }
    // Update user in DB (replace with your actual User model logic)
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, imageUrl },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ message: 'Profile updated successfully!', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Change Password (Protected Route)
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get User Profile (Protected Route)
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/upload-profile-image', auth, upload.single('profileImage'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ imageUrl: req.file.path });
});

// Test endpoint to check users (remove in production)
router.get('/test-users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json({ 
      message: 'Users in database',
      count: users.length,
      users: users.map(u => ({ id: u._id, name: u.name, email: u.email, createdAt: u.createdAt }))
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router; 