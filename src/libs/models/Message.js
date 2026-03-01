// libs/models/mongodb/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  propertyTitle: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  senderPhone: { type: String },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverName: { type: String, required: true },
  receiverEmail: { type: String, required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  readAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  type: { 
    type: String, 
    enum: ['inquiry', 'response', 'notification'],
    default: 'inquiry'
  },
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  }
});

// Índices para buscar mensagens por usuário
MessageSchema.index({ senderId: 1, createdAt: -1 });
MessageSchema.index({ receiverId: 1, createdAt: -1 });

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);