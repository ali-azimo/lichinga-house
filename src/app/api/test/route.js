// app/api/test/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/libs/models/mongodb/';
import User from '@/libs/models/mongodb/User';

export async function GET() {
  try {
    console.log('🔄 Iniciando teste de conexão...');
    
    // Testar conexão
    await connectDB();
    console.log('✅ Conexão estabelecida');
    
    // Verificar se a collection users existe
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('📁 Collections:', collectionNames);
    
    // Contar usuários
    const userCount = await User.countDocuments();
    console.log(`👥 Total de usuários: ${userCount}`);
    
    // Buscar último usuário (se houver)
    let lastUser = null;
    if (userCount > 0) {
      lastUser = await User.findOne().sort({ createdAt: -1 });
    }
    
    return NextResponse.json({
      success: true,
      message: '✅ MongoDB está funcionando!',
      database: {
        connected: true,
        collections: collectionNames,
        userCount,
        lastUser: lastUser ? {
          id: lastUser._id,
          name: lastUser.displayName,
          email: lastUser.email,
          createdAt: lastUser.createdAt
        } : null
      }
    });
    
  } catch (error) {
    console.error('❌ Erro:', error);
    return NextResponse.json({
      success: false,
      message: '❌ Erro ao conectar MongoDB',
      error: error.message
    }, { status: 500 });
  }
}