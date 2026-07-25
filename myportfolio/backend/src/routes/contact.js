const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const emailjs = require('@emailjs/nodejs');
const Message = require('../models/Message');

// Rate limit: 10 requests per minute per IP
const limiter = rateLimit({ windowMs: 60 * 1000, max: 10 });
router.use(limiter);

// EmailJS init (requires private key on server-side)
// Generate a Private Key in EmailJS Dashboard -> Account -> API Keys
if (process.env.EMAILJS_PUBLIC_KEY && process.env.EMAILJS_PRIVATE_KEY) {
  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
  });
} else {
  console.warn(
    'EmailJS private key not set. Skipping server-side email sending. Set EMAILJS_PUBLIC_KEY and EMAILJS_PRIVATE_KEY in .env.'
  );
}

// Helpers
const isValidEmail = (email) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Persist to MongoDB
    const saved = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.get('User-Agent') || '',
    });
    console.log(`[contact] saved message ${saved._id} for ${saved.email}`);

    // Send via EmailJS (best-effort) only if private key is present
    let emailSent = false;
    if (process.env.EMAILJS_PRIVATE_KEY) {
      try {
        await emailjs.send(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_TEMPLATE_ID,
          {
            user_name: saved.name,
            user_email: saved.email,
            message: saved.message,
            submitted_at: saved.createdAt.toISOString(),
            ip_address: saved.ipAddress,
            user_agent: saved.userAgent,
          }
        );
        emailSent = true;
        console.log(`[contact] email sent via EmailJS for ${saved._id}`);
      } catch (err) {
        // Log but don't fail overall request
        console.error('EmailJS send failed:', err?.text || err?.message || err);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Message received',
      data: { id: saved._id, createdAt: saved.createdAt },
      emailSent,
    });
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
