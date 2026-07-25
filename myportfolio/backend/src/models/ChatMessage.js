const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    role: { type: String, required: true, enum: ['user', 'assistant'] },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true, collection: 'chatbot_conversations' }
);

// Index for efficient querying by session
chatMessageSchema.index({ sessionId: 1, timestamp: 1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
