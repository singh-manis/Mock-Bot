const express = require('express');
const Session = require('../models/Session');
const auth = require('../middleware/auth');
const router = express.Router();

// Save a session (protected)
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { role, messages } = req.body;
    console.log('Saving session:', { userId, role, messages });
    const session = new Session({ user: userId, role, messages });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    console.error('Session save error:', err);
    res.status(500).json({ error: 'Failed to save session.' });
  }
});

// Get all sessions for a user (protected)
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await Session.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions.' });
  }
});

// Delete a session by ID (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const session = await Session.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found or not authorized.' });
    }
    res.json({ message: 'Session deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete session.' });
  }
});

// Update session title by ID (protected)
router.patch('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title },
      { new: true }
    );
    if (!session) {
      return res.status(404).json({ error: 'Session not found or not authorized.' });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update session.' });
  }
});

module.exports = router; 