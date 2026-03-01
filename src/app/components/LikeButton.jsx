// app/components/LikeButton.jsx
'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '@/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FiHeart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function LikeButton({ propertyId, initialLiked = false }) {
  const { user, hasPermission } = useAuth();
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!hasPermission('canLike')) {
      alert('Você não tem permissão para isso');
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      
      if (liked) {
        await updateDoc(userRef, {
          favorites: arrayRemove(propertyId)
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(propertyId)
        });
      }
      
      setLiked(!liked);
    } catch (error) {
      console.error('Erro ao atualizar like:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!hasPermission('canLike')) return null;

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`p-2 rounded-full transition ${
        liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
      }`}
    >
      <FiHeart className={liked ? 'fill-current' : ''} />
    </button>
  );
}