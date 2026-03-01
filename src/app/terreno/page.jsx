// app/terreno/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHeart, FiMessageCircle, FiFilter, FiMap } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function TerrenoPage() {
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
          title: 'Terreno Urbano',
          price: '€ 150.000',
          location: 'Lisboa',
          area: '500m²',
          description: 'Terreno urbano com projeto aprovado para construção.',
          zoning: 'Residencial'
        },
        {
          id: 2,
          title: 'Terreno para Construção',
          price: '€ 95.000',
          location: 'Porto',
          area: '350m²',
          description: 'Excelente localização, próximo a comércios e escolas.',
          zoning: 'Residencial'
        },
        {
          id: 3,
          title: 'Terreno Agrícola',
          price: '€ 75.000',
          location: 'Évora',
          area: '2 hectares',
          description: 'Terreno plano com água e eletricidade.',
          zoning: 'Agrícola'
        },
        {
          id: 4,
          title: 'Loteamento',
          price: '€ 250.000',
          location: 'Algarve',
          area: '1.200m²',
          description: 'Loteamento com infraestrutura completa.',
          zoning: 'Misto'
        },
        {
          id: 5,
          title: 'Terreno Comercial',
          price: '€ 180.000',
          location: 'Braga',
          area: '800m²',
          description: 'Terreno para construção comercial, zona nobre.',
          zoning: 'Comercial'
        },
        {
          id: 6,
          title: 'Quinta com Terreno',
          price: '€ 320.000',
          location: 'Santarém',
          area: '5 hectares',
          description: 'Quinta com terreno agricultável e casa para recuperar.',
          zoning: 'Rural'
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
        <h1 className="text-4xl font-bold mb-4">Terrenos</h1>
        <p className="text-gray-600">
          Encontre o terreno ideal para seu projeto
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
                placeholder="Área mínima (m²)"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-600">
            {filteredProperties.length} terrenos encontrados
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white">
                  <FiMap className="w-16 h-16" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-yellow-600 font-bold text-xl mb-3">{property.price}</p>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>Área: {property.area}</span>
                    <span>Zona: {property.zoning}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/terreno/${property.id}`}
                      className="text-yellow-600 hover:underline"
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