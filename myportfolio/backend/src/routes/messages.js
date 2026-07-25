const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /api/messages (admin-protected)
router.get('/', async (req, res) => {
  try {
    const token = req.header('x-admin-token');
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: messages });
  } catch (error) {
    console.error('GET /api/messages error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
