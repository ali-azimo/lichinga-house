// app/components/CreatePropertyButton.jsx
'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FiPlus } from 'react-icons/fi';

export default function CreatePropertyButton() {
  const { user, hasPermission } = useAuth();

  if (!user || !hasPermission('canCreateProperties')) {
    return null;
  }

  return (
    <Link
      href="/criar-imovel"
      className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
    >
      <FiPlus className="w-6 h-6" />
    </Link>
  );
}