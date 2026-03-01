// app/api/auth/sync-user/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/libs/models/mongodb';
import User from '@/libs/models/mongodb/User';

export async function POST(request) {
  try {
    await connectDB();
    
    const { uid, email, displayName, photoURL, phone, provider } = await request.json();

    console.log('📝 Sincronizando usuário:', { uid, email, displayName });

    // Validar dados obrigatórios
    if (!uid || !email) {
      return NextResponse.json(
        { error: 'UID e email são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se usuário já existe
    let user = await User.findOne({ uid });

    if (user) {
      // Atualizar usuário existente
      user.lastLogin = new Date();
      user.updatedAt = new Date();
      
      if (displayName) user.displayName = displayName;
      if (photoURL) user.photoURL = photoURL;
      if (phone) user.phone = phone;
      
      await user.save();
      
      console.log('✅ Usuário atualizado:', user._id);
    } else {
      // Criar novo usuário
      user = new User({
        uid,
        email,
        displayName: displayName || email.split('@')[0],
        photoURL: photoURL || '',
        phone: phone || '',
        role: 'user',
        canCreateProperties: false,
        provider: provider || 'email',
        lastLogin: new Date()
      });

      await user.save();
      
      console.log('✅ Novo usuário criado:', user._id);
    }

    return NextResponse.json({
      success: true,
      message: 'Usuário sincronizado com sucesso',
      user: {
        _id: user._id,
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}