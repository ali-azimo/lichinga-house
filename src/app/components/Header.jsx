'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiDollarSign, FiMap, FiUsers, FiInfo, FiMail, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Imóveis
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link href="/venda" className="flex items-center space-x-1 hover:text-blue-600">
              <FiDollarSign />
              <span>Venda</span>
            </Link>
            <Link href="/arrendamento" className="flex items-center space-x-1 hover:text-blue-600">
              <FiHome />
              <span>Arrendamento</span>
            </Link>
            <Link href="/terreno" className="flex items-center space-x-1 hover:text-blue-600">
              <FiMap />
              <span>Terreno</span>
            </Link>
            <Link href="/campo" className="flex items-center space-x-1 hover:text-blue-600">
              <FiUsers />
              <span>Campo</span>
            </Link>
            <Link href="/sobre" className="flex items-center space-x-1 hover:text-blue-600">
              <FiInfo />
              <span>Sobre</span>
            </Link>
            <Link href="/contacto" className="flex items-center space-x-1 hover:text-blue-600">
              <FiMail />
              <span>Contacto</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Olá, {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  <FiLogOut />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <FiLogIn />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;