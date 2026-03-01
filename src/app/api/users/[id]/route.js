// app/api/users/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/libs/models/mongodb';
import User from '@/libs/models/mongodb/User';

// GET /api/users/[id] - Buscar usuário por ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const user = await User.findById(params.id)
      .populate('favorites', 'title price location')
      .populate('properties', 'title price status');
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuário' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Atualizar usuário
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Se role foi alterada, atualizar canCreateProperties
    if (data.role) {
      data.canCreateProperties = data.role === 'property_creator' || data.role === 'admin';
    }
    
    const user = await User.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Deletar usuário (apenas admin)
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const user = await User.findByIdAndDelete(params.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Usuário deletado com sucesso' }
    );
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar usuário' },
      { status: 500 }
    );
  }
}