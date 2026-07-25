const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const ChatMessage = require('../models/ChatMessage');

// Rate limit for chatbot (higher than contact form)
const chatLimiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
router.use(chatLimiter);

// POST /api/chatbot/message - Save chatbot conversation to MongoDB
router.post('/message', async (req, res) => {
  try {
    const { sessionId, userMessage, botResponse, timestamp } = req.body || {};

    if (!sessionId || !userMessage || !botResponse) {
      return res.status(400).json({ 
        success: false, 
        message: 'sessionId, userMessage, and botResponse are required' 
      });
    }

    // Save user message
    const userMsg = await ChatMessage.create({
      sessionId,
      role: 'user',
      content: userMessage.trim(),
      timestamp: timestamp || new Date(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.get('User-Agent') || '',
    });

    // Save bot response
    const botMsg = await ChatMessage.create({
      sessionId,
      role: 'assistant',
      content: botResponse.trim(),
      timestamp: new Date(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.get('User-Agent') || '',
    });

    console.log(`[chatbot] saved conversation for session ${sessionId}`);

    return res.json({
      success: true,
      message: 'Conversation saved to MongoDB',
      data: { 
        sessionId,
        userMessageId: userMsg._id,
        botMessageId: botMsg._id,
      }
    });
  } catch (error) {
    console.error('POST /api/chatbot/message error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/chatbot/sessions - Get all chat sessions from MongoDB (admin only)
router.get('/sessions', async (req, res) => {
  try {
    const token = req.header('x-admin-token');
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Aggregate sessions from MongoDB
    const sessions = await ChatMessage.aggregate([
      {
        $group: {
          _id: '$sessionId',
          messageCount: { $sum: 1 },
          lastActive: { $max: '$createdAt' },
          firstMessage: { $min: '$createdAt' },
          ipAddress: { $first: '$ipAddress' },
          userAgent: { $first: '$userAgent' }
        }
      },
      { $sort: { lastActive: -1 } },
      { $limit: 100 }
    ]);

    const formattedSessions = sessions.map(session => ({
      sessionId: session._id,
      messageCount: session.messageCount,
      createdAt: session.firstMessage,
      lastActive: session.lastActive,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
    }));

    return res.json({ 
      success: true, 
      data: formattedSessions
    });
  } catch (error) {
    console.error('GET /api/chatbot/sessions error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/chatbot/sessions/:sessionId - Get specific session messages from MongoDB (admin only)
router.get('/sessions/:sessionId', async (req, res) => {
  try {
    const token = req.header('x-admin-token');
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { sessionId } = req.params;
    const messages = await ChatMessage.find({ sessionId })
      .sort({ createdAt: 1 })
      .select('role content timestamp createdAt');

    if (messages.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Session not found' 
      });
    }

    return res.json({ 
      success: true, 
      data: {
        sessionId,
        messageCount: messages.length,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
          createdAt: msg.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('GET /api/chatbot/sessions/:sessionId error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
