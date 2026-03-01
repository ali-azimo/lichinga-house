'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './context/AuthContext';
import { FiHome, FiDollarSign, FiMap, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular carregamento de propriedades (depois virá do Firebase)
  useEffect(() => {
    setTimeout(() => {
      setFeaturedProperties([
        {
          id: 1,
          title: 'Casa Moderna com Piscina',
          price: '€ 450.000',
          location: 'Lisboa, Portugal',
          type: 'venda',
          image: '/images/casa1.jpg',
          beds: 4,
          baths: 3,
          area: '250m²'
        },
        {
          id: 2,
          title: 'Apartamento T3 no Centro',
          price: '€ 1.800/mês',
          location: 'Porto, Portugal',
          type: 'arrendamento',
          image: '/images/apart1.jpg',
          beds: 3,
          baths: 2,
          area: '120m²'
        },
        {
          id: 3,
          title: 'Terreno para Construção',
          price: '€ 120.000',
          location: 'Algarve, Portugal',
          type: 'terreno',
          image: '/images/terreno1.jpg',
          area: '500m²'
        },
        {
          id: 4,
          title: 'Quinta com Campos Agrícolas',
          price: '€ 750.000',
          location: 'Évora, Portugal',
          type: 'campo',
          image: '/images/quinta1.jpg',
          area: '2.5 hectares'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Mais de 10.000 imóveis disponíveis para venda e arrendamento em todo Portugal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/venda" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Comprar Imóvel
            </Link>
            <Link 
              href="/arrendamento" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Arrendar Imóvel
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Localização"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Tipo de Imóvel</option>
              <option>Venda</option>
              <option>Arrendamento</option>
              <option>Terreno</option>
              <option>Campo</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Preço Máximo</option>
              <option>€100.000</option>
              <option>€250.000</option>
              <option>€500.000</option>
              <option>€1.000.000+</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="/venda" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <FiDollarSign className="w-12 h-12 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold">Venda</h3>
              <p className="text-gray-600">Compre seu imóvel</p>
            </div>
          </Link>
          
          <Link href="/arrendamento" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <FiHome className="w-12 h-12 mx-auto mb-4 text-green-600 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold">Arrendamento</h3>
              <p className="text-gray-600">Alugue um imóvel</p>
            </div>
          </Link>
          
          <Link href="/terreno" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <FiMap className="w-12 h-12 mx-auto mb-4 text-yellow-600 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold">Terrenos</h3>
              <p className="text-gray-600">Construa seu sonho</p>
            </div>
          </Link>
          
          <Link href="/campo" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <svg className="w-12 h-12 mx-auto mb-4 text-orange-600 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="text-xl font-semibold">Campo</h3>
              <p className="text-gray-600">Propriedades rurais</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Imóveis em Destaque */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Imóveis em Destaque</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gray-300 relative">
                  {/* Placeholder para imagem */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                    {property.type === 'venda' && '🏠 Casa'}
                    {property.type === 'arrendamento' && '🏢 Apartamento'}
                    {property.type === 'terreno' && '🗺️ Terreno'}
                    {property.type === 'campo' && '🌳 Campo'}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-blue-600 font-bold text-xl mb-3">{property.price}</p>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    {property.beds && <span>{property.beds} quartos</span>}
                    {property.baths && <span>{property.baths} banheiros</span>}
                    <span>{property.area}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/imovel/${property.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver detalhes
                    </Link>
                    
                    {user && (
                      <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-red-500">
                          <FiHeart />
                        </button>
                        <button className="text-gray-500 hover:text-blue-500">
                          <FiMessageCircle />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Por que escolhernos */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Por que escolher a nossa plataforma?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mais de 10.000 imóveis</h3>
              <p className="text-gray-600">O maior portal imobiliário de Portugal</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Atendimento personalizado</h3>
              <p className="text-gray-600">Equipe dedicada para ajudar você</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fotos e vídeos reais</h3>
              <p className="text-gray-600">Conteúdo atualizado e verificado</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}