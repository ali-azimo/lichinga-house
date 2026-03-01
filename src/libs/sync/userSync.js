// libs/sync/userSync.js
import { db as firestore } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

class UserSyncService {
  // Sincronizar usuário do Firebase com MongoDB
  async syncUser(firebaseUser) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          phone: firebaseUser.phoneNumber,
          provider: firebaseUser.providerData[0]?.providerId || 'email'
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao sincronizar usuário');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na sincronização:', error);
      throw error;
    }
  }

  // Observar mudanças no Firestore
  watchUserChanges(userId, callback) {
    const userRef = doc(firestore, 'users', userId);
    
    return onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      }
    });
  }
}

export const userSync = new UserSyncService();