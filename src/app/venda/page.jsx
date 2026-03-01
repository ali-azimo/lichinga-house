'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHeart, FiMessageCircle, FiFilter } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function VendaPage() {
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
    // Simular carregamento de dados
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: 'Casa Moderna com Piscina',
          price: '€ 450.000',
          location: 'Lisboa',
          bedrooms: 4,
          bathrooms: 3,
          area: '250m²',
          description: 'Linda casa moderna com piscina, jardim e acabamentos de luxo.',
          image: '/images/casa1.jpg'
        },
        {
          id: 2,
          title: 'Apartamento T3 no Centro',
          price: '€ 320.000',
          location: 'Porto',
          bedrooms: 3,
          bathrooms: 2,
          area: '120m²',
          description: 'Apartamento completamente renovado no coração do Porto.',
          image: '/images/apart1.jpg'
        },
        {
          id: 3,
          title: 'Moradia Geminada',
          price: '€ 280.000',
          location: 'Braga',
          bedrooms: 3,
          bathrooms: 2,
          area: '150m²',
          description: 'Moradia em excelente estado, perto de escolas e comércio.',
          image: '/images/moradia1.jpg'
        },
        {
          id: 4,
          title: 'Casa de Praia',
          price: '€ 650.000',
          location: 'Algarve',
          bedrooms: 5,
          bathrooms: 4,
          area: '300m²',
          description: 'Espectacular casa à beira-mar com vista panorâmica.',
          image: '/images/praia1.jpg'
        },
        {
          id: 5,
          title: 'Apartamento T2',
          price: '€ 195.000',
          location: 'Coimbra',
          bedrooms: 2,
          bathrooms: 1,
          area: '85m²',
          description: 'Apartamento acolhedor com excelente exposição solar.',
          image: '/images/apart2.jpg'
        },
        {
          id: 6,
          title: 'Villa de Luxo',
          price: '€ 1.200.000',
          location: 'Cascais',
          bedrooms: 6,
          bathrooms: 5,
          area: '450m²',
          description: 'Villa exclusiva com piscina, jardim e vista para o mar.',
          image: '/images/villa1.jpg'
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
        <h1 className="text-4xl font-bold mb-4">Imóveis à Venda</h1>
        <p className="text-gray-600">
          Encontre a casa perfeita para você e sua família
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
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl">
                  🏠
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-blue-600 font-bold text-xl mb-3">{property.price}</p>
                  
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
        </>
      )}
    </div>
  );
}