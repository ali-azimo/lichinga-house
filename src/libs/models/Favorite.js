// libs/models/mongodb/Favorite.js
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  propertyTitle: { type: String, required: true },
  propertyPrice: { type: Number, required: true },
  propertyLocation: { type: String, required: true },
  propertyImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false } // para notificações de mudança de preço
});

// Garantir que um usuário não favorite o mesmo imóvel duas vezes
FavoriteSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

export default mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema);