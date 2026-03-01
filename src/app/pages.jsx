// app/page.js
'use client';

import Link from 'next/link';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Plataforma de Imóveis</h1>
        <p className="text-xl mb-8">Encontre o imóvel perfeito para você</p>
        <div className="space-x-4">
          <Link href="/venda" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Ver Imóveis
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Venda</h3>
          <p className="text-gray-600 mb-4">Encontre imóveis à venda</p>
          <Link href="/venda" className="text-blue-600 hover:underline">Ver mais →</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Arrendamento</h3>
          <p className="text-gray-600 mb-4">Imóveis para arrendar</p>
          <Link href="/arrendamento" className="text-blue-600 hover:underline">Ver mais →</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Terrenos</h3>
          <p className="text-gray-600 mb-4">Terrenos disponíveis</p>
          <Link href="/terreno" className="text-blue-600 hover:underline">Ver mais →</Link>
        </div>
      </section>
    </div>
  );
}