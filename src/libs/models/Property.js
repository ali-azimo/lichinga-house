// libs/models/mongodb/Property.js
import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['venda', 'arrendamento', 'terreno', 'campo'],
    required: true 
  },
  category: { 
    type: String, 
    enum: ['residencial', 'comercial', 'rural', 'industrial'],
    default: 'residencial'
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    postalCode: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  details: {
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, required: true },
    areaUnit: { type: String, default: 'm²' },
    floors: { type: Number, default: 1 },
    yearBuilt: { type: Number },
    condition: { 
      type: String, 
      enum: ['new', 'good', 'renovation', 'needs_work'],
      default: 'good'
    },
    features: [{ type: String }] // array de características
  },
  media: {
    images: [{ 
      url: String,
      firebasePath: String,
      isMain: { type: Boolean, default: false }
    }],
    videos: [{ 
      url: String,
      firebasePath: String 
    }],
    virtualTour: { type: String }
  },
  contact: {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    ownerPhone: { type: String }
  },
  status: { 
    type: String, 
    enum: ['active', 'sold', 'rented', 'inactive'],
    default: 'active'
  },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Índices para busca
PropertySchema.index({ 'location.city': 1, type: 1, price: 1 });
PropertySchema.index({ title: 'text', description: 'text' });

PropertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);