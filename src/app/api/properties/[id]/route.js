// app/api/properties/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/libs/models/mongodb';
import Property from '@/libs/models/mongodb/Property';
import { firebaseStorage } from '@/libs/firebase/storage';

// GET /api/properties/[id] - Buscar propriedade por ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const property = await Property.findById(params.id)
      .populate('contact.ownerId', 'displayName email phone');
    
    if (!property) {
      return NextResponse.json(
        { error: 'Propriedade não encontrada' },
        { status: 404 }
      );
    }
    
    // Incrementar visualizações
    property.views += 1;
    await property.save();
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Erro ao buscar propriedade:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar propriedade' },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id] - Atualizar propriedade
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const data = JSON.parse(formData.get('data'));
    const newImages = formData.getAll('newImages');
    
    const property = await Property.findById(params.id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Propriedade não encontrada' },
        { status: 404 }
      );
    }
    
    // Upload de novas imagens
    if (newImages.length > 0) {
      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i];
        const result = await firebaseStorage.uploadImage(file, 'properties');
        property.media.images.push({
          url: result.url,
          firebasePath: result.path,
          isMain: property.media.images.length === 0 && i === 0
        });
      }
    }
    
    // Atualizar outros dados
    Object.assign(property, data);
    property.updatedAt = new Date();
    
    await property.save();
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Erro ao atualizar propriedade:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar propriedade' },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] - Deletar propriedade
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const property = await Property.findById(params.id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Propriedade não encontrada' },
        { status: 404 }
      );
    }
    
    // Deletar imagens do Firebase Storage
    if (property.media?.images?.length > 0) {
      for (const image of property.media.images) {
        if (image.firebasePath) {
          try {
            await firebaseStorage.deleteImage(image.firebasePath);
          } catch (error) {
            console.error('Erro ao deletar imagem:', error);
          }
        }
      }
    }
    
    await Property.findByIdAndDelete(params.id);
    
    return NextResponse.json(
      { message: 'Propriedade deletada com sucesso' }
    );
  } catch (error) {
    console.error('Erro ao deletar propriedade:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar propriedade' },
      { status: 500 }
    );
  }
}