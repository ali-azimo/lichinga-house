// app/campo/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHeart, FiMessageCircle, FiFilter } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function CampoPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    areaMin: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: 'Quinta com Vinha',
          price: '€ 450.000',
          location: 'Douro',
          area: '10 hectares',
          description: 'Quinta produtiva com vinha, adega e casa principal.',
          features: ['Vinha', 'Adega', 'Casa T4']
        },
        {
          id: 2,
          title: 'Herdade Alentejana',
          price: '€ 750.000',
          location: 'Alentejo',
          area: '50 hectares',
          description: 'Herdade com montado de sobro, olival e pastagens.',
          features: ['Montado', 'Olival', 'Açude']
        },
        {
          id: 3,
          title: 'Quinta de Recreio',
          price: '€ 320.000',
          location: 'Sintra',
          area: '5 hectares',
          description: 'Quinta com mata, jardins e casa recuperada.',
          features: ['Mata', 'Jardim', 'Casa T3']
        },
        {
          id: 4,
          title: 'Terreno Agrícola',
          price: '€ 120.000',
          location: 'Ribatejo',
          area: '15 hectares',
          description: 'Terreno agrícola com água e eletricidade.',
          features: ['Regadio', 'Armazém']
        },
        {
          id: 5,
          title: 'Quinta Turismo Rural',
          price: '€ 890.000',
          location: 'Algarve',
          area: '20 hectares',
          description: 'Quinta com alojamento turístico em funcionamento.',
          features: ['Turismo Rural', 'Piscina', 'Restaurante']
        },
        {
          id: 6,
          title: 'Herdade com Monte',
          price: '€ 550.000',
          location: 'Beja',
          area: '30 hectares',
          description: 'Herdade com monte alentejano para recuperar.',
          features: ['Monte', 'Poço', 'Celeiro']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredProperties = properties.filter(prop => {
    if (filters.location && !prop.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.areaMin) {
      const area = parseInt(prop.area);
      if (area < parseInt(filters.areaMin)) return false;
    }
    if (filters.priceMin) {
      const price = parseInt(prop.price.replace(/[^0-9]/g, ''));
      if (price < parseInt(filters.priceMin)) return false;
    }
    if (filters.priceMax) {
      const price = parseInt(prop.price.replace(/[^0-9]/g, ''));
      if (price > parseInt(filters.priceMax)) return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Propriedades Rurais</h1>
        <p className="text-gray-600">
          Descubra o encanto da vida no campo
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <FiFilter />
          <span>Filtros</span>
        </button>

        {showFilters && (
          <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="location"
                placeholder="Localização"
                value={filters.location}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                name="areaMin"
                placeholder="Área mínima (hectares)"
                value={filters.areaMin}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                name="priceMin"
                placeholder="Preço mínimo (€)"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                name="priceMax"
                placeholder="Preço máximo (€)"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {/* Resultados */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-600">
            {filteredProperties.length} propriedades encontradas
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-green-600 font-bold text-xl mb-3">{property.price}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Área: {property.area}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {property.features.map((feature, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/campo/${property.id}`}
                      className="text-green-600 hover:underline"
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
        </>
      )}
    </div>
  );
}