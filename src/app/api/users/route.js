// app/api/users/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/libs/models/mongodb';
import User from '@/libs/models/mongodb/User';

// GET /api/users - Listar todos os usuários (apenas admin)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    
    let query = {};
    
    if (role) {
      query.role = role;
    }
    
    if (search) {
      query.$or = [
        { displayName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments(query);
    
    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}

// POST /api/users - Criar usuário manualmente (apenas admin)
export async function POST(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Verificar se já existe
    const existingUser = await User.findOne({ 
      $or: [
        { email: data.email },
        { uid: data.uid }
      ]
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Usuário já existe' },
        { status: 400 }
      );
    }
    
    // Criar usuário
    const user = new User({
      ...data,
      canCreateProperties: data.role === 'property_creator' || data.role === 'admin'
    });
    
    await user.save();
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    );
  }
}