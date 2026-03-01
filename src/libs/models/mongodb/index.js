import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'lichinga',
      serverSelectionTimeoutMS: 5000,
    });
  }

  cached.conn = await cached.promise;
  console.log('✅ MongoDB conectado com sucesso');
  return cached.conn;
}