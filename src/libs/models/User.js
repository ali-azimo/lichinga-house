// libs/models/mongodb/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Dados do Firebase
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  photoURL: { type: String, default: '' },
  
  // Dados adicionais
  phone: { type: String, default: '' },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    country: { type: String, default: 'Portugal' }
  },
  documentId: { type: String, default: '' }, // BI/CC
  birthDate: { type: Date },
  profession: { type: String, default: '' },
  
  // Permissões
  role: { 
    type: String, 
    enum: ['user', 'property_creator', 'admin'],
    default: 'user'
  },
  canCreateProperties: { type: Boolean, default: false },
  
  // Relacionamentos
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }], // propriedades que criou
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  
  // Metadados
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  provider: { type: String, enum: ['email', 'google', 'facebook'], default: 'email' },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  
  // Configurações
  preferences: {
    language: { type: String, default: 'pt' },
    currency: { type: String, default: 'EUR' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    }
  }
});

// Índices
UserSchema.index({ email: 1 });
UserSchema.index({ uid: 1 });
UserSchema.index({ role: 1 });

// Middleware para atualizar updatedAt
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Métodos de instância
UserSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

UserSchema.methods.isPropertyCreator = function() {
  return this.role === 'property_creator' || this.role === 'admin';
};

UserSchema.methods.can = function(permission) {
  const permissions = {
    admin: ['view', 'like', 'message', 'create_property', 'manage_users', 'manage_properties', 'delete_any'],
    property_creator: ['view', 'like', 'message', 'create_property', 'edit_own', 'delete_own'],
    user: ['view', 'like', 'message']
  };
  return permissions[this.role]?.includes(permission) || false;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);