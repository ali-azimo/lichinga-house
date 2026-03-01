// src/libs/models/mongodb/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  displayName: { 
    type: String, 
    required: true 
  },
  photoURL: { 
    type: String, 
    default: '' 
  },
  phone: { 
    type: String, 
    default: '' 
  },
  role: { 
    type: String, 
    enum: ['user', 'property_creator', 'admin'],
    default: 'user'
  },
  canCreateProperties: { 
    type: Boolean, 
    default: false 
  },
  favorites: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Property' 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: { 
    type: Date 
  },
  provider: { 
    type: String, 
    enum: ['email', 'google', 'facebook'], 
    default: 'email' 
  }
});

// Atualizar updatedAt antes de salvar
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);