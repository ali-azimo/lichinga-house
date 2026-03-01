// libs/firebase/storage.js
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll 
} from 'firebase/storage';
import { storage } from '@/firebase';

class FirebaseStorageService {
  // Upload de imagem única
  async uploadImage(file, path = 'properties') {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `${path}/${fileName}`);
      
      // Upload do arquivo
      const snapshot = await uploadBytes(storageRef, file);
      
      // Pegar URL de download
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        url: downloadURL,
        path: `${path}/${fileName}`,
        fileName: fileName
      };
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  }

  // Upload de múltiplas imagens
  async uploadMultipleImages(files, path = 'properties') {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file, path));
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Erro ao fazer upload múltiplo:', error);
      throw error;
    }
  }

  // Deletar imagem
  async deleteImage(path) {
    try {
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
      return { success: true, message: 'Imagem deletada com sucesso' };
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      throw error;
    }
  }

  // Listar imagens de uma pasta
  async listImages(path) {
    try {
      const listRef = ref(storage, path);
      const res = await listAll(listRef);
      
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            url,
            path: itemRef.fullPath,
            name: itemRef.name
          };
        })
      );
      
      return urls;
    } catch (error) {
      console.error('Erro ao listar imagens:', error);
      throw error;
    }
  }

  // Upload de imagem de perfil
  async uploadProfileImage(file, userId) {
    return this.uploadImage(file, `users/${userId}/profile`);
  }

  // Upload de imagem de propriedade
  async uploadPropertyImage(file, propertyId) {
    return this.uploadImage(file, `properties/${propertyId}`);
  }
}

export const firebaseStorage = new FirebaseStorageService();