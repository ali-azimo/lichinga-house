// app/context/AuthContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { persistUser, getPersistedUser, clearPersistedUser } from '@/libs/persistor';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para sincronizar com MongoDB
  const syncUserWithMongoDB = async (firebaseUser) => {
    try {
      const provider = firebaseUser.providerData[0]?.providerId || 'email';
      
      const response = await fetch('/api/auth/sync-user', {
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
          provider
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao sincronizar com MongoDB');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Erro na sincronização:', error);
      setError(error.message);
      return null;
    }
  };

  useEffect(() => {
    // Verificar usuário persistido
    const persistedUser = getPersistedUser();
    if (persistedUser) {
      setUser(persistedUser);
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Sincronizar com MongoDB
          const mongoUserData = await syncUserWithMongoDB(firebaseUser);
          
          if (mongoUserData) {
            setMongoUser(mongoUserData);
            
            // Combinar dados do Firebase com MongoDB
            const combinedUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || mongoUserData.displayName,
              photoURL: firebaseUser.photoURL,
              phone: firebaseUser.phoneNumber || mongoUserData.phone,
              role: mongoUserData.role,
              canCreateProperties: mongoUserData.canCreateProperties,
              mongoId: mongoUserData._id,
              favorites: mongoUserData.favorites || [],
              createdAt: mongoUserData.createdAt,
              lastLogin: mongoUserData.lastLogin
            };
            
            setUser(combinedUser);
            persistUser(combinedUser);
          }
        } else {
          // Usuário deslogado
          setUser(null);
          setMongoUser(null);
          clearPersistedUser();
        }
      } catch (err) {
        console.error('Erro no auth state change:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Funções de utilidade
  const isAdmin = user?.role === 'admin';
  const isPropertyCreator = user?.role === 'property_creator' || user?.role === 'admin';
  const isRegularUser = user?.role === 'user';

  const hasPermission = (permission) => {
    if (!user) return false;
    
    const permissions = {
      admin: ['view', 'like', 'message', 'create_property', 'manage_users', 'manage_properties'],
      property_creator: ['view', 'like', 'message', 'create_property'],
      user: ['view', 'like', 'message']
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const refreshUserData = async () => {
    if (!user?.uid) return;
    
    try {
      const response = await fetch(`/api/users/${user.mongoId}`);
      if (response.ok) {
        const freshUserData = await response.json();
        setMongoUser(freshUserData);
        
        const updatedUser = {
          ...user,
          ...freshUserData,
          favorites: freshUserData.favorites
        };
        
        setUser(updatedUser);
        persistUser(updatedUser);
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  const value = {
    user,
    mongoUser,
    loading,
    error,
    isAdmin,
    isPropertyCreator,
    isRegularUser,
    hasPermission,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};