// app/arrendamento/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHeart, FiMessageCircle, FiFilter } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function ArrendamentoPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: 'Apartamento T2 Mobilado',
          price: '€ 1.200/mês',
          location: 'Lisboa',
          bedrooms: 2,
          bathrooms: 1,
          area: '90m²',
          description: 'Apartamento totalmente mobilado, pronto para habitar.',
          image: '/images/aluguel1.jpg'
        },
        {
          id: 2,
          title: 'T3 no Centro do Porto',
          price: '€ 1.500/mês',
          location: 'Porto',
          bedrooms: 3,
          bathrooms: 2,
          area: '130m²',
          description: 'Excelente apartamento com vistas panorâmicas.',
          image: '/images/aluguel2.jpg'
        },
        {
          id: 3,
          title: 'Estúdio Moderno',
          price: '€ 850/mês',
          location: 'Braga',
          bedrooms: 1,
          bathrooms: 1,
          area: '45m²',
          description: 'Estúdio moderno, ideal para estudantes ou solteiros.',
          image: '/images/aluguel3.jpg'
        },
        {
          id: 4,
          title: 'Casa T4 com Jardim',
          price: '€ 2.500/mês',
          location: 'Cascais',
          bedrooms: 4,
          bathrooms: 3,
          area: '200m²',
          description: 'Casa espaçosa com jardim e piscina.',
          image: '/images/aluguel4.jpg'
        },
        {
          id: 5,
          title: 'T1 com Varanda',
          price: '€ 950/mês',
          location: 'Coimbra',
          bedrooms: 1,
          bathrooms: 1,
          area: '60m²',
          description: 'Apartamento com varanda e excelente localização.',
          image: '/images/aluguel5.jpg'
        },
        {
          id: 6,
          title: 'Loft no Centro Histórico',
          price: '€ 1.100/mês',
          location: 'Évora',
          bedrooms: 1,
          bathrooms: 1,
          area: '75m²',
          description: 'Loft moderno em edifício histórico recuperado.',
          image: '/images/aluguel6.jpg'
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
    if (filters.bedrooms && prop.bedrooms < parseInt(filters.bedrooms)) {
      return false;
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
        <h1 className="text-4xl font-bold mb-4">Imóveis para Arrendamento</h1>
        <p className="text-gray-600">
          Encontre o imóvel perfeito para alugar
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
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Quartos</option>
                <option value="1">1+ quartos</option>
                <option value="2">2+ quartos</option>
                <option value="3">3+ quartos</option>
                <option value="4">4+ quartos</option>
              </select>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-600">
            {filteredProperties.length} imóveis encontrados
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-4xl">
                  🏢
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-green-600 font-bold text-xl mb-3">{property.price}</p>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{property.bedrooms} quartos</span>
                    <span>{property.bathrooms} banheiros</span>
                    <span>{property.area}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/imovel/${property.id}`}
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