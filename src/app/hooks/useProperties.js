// app/hooks/useProperties.js
'use client';

import { useState, useEffect } from 'react';

export function useProperties(filters = {}, page = 1) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchProperties();
  }, [JSON.stringify(filters), page]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page,
        limit: 10,
        ...filters
      });

      const response = await fetch(`/api/properties?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar propriedades');
      }

      const data = await response.json();
      setProperties(data.properties);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (propertyData, images) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(propertyData));
      
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await fetch('/api/properties', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao criar propriedade');
      }

      const newProperty = await response.json();
      setProperties(prev => [newProperty, ...prev]);
      
      return newProperty;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProperty = async (id, propertyData, newImages = []) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(propertyData));
      
      newImages.forEach((image) => {
        formData.append('newImages', image);
      });

      const response = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar propriedade');
      }

      const updatedProperty = await response.json();
      setProperties(prev => 
        prev.map(p => p._id === id ? updatedProperty : p)
      );
      
      return updatedProperty;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProperty = async (id) => {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar propriedade');
      }

      setProperties(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    properties,
    loading,
    error,
    pagination,
    createProperty,
    updateProperty,
    deleteProperty,
    refetch: fetchProperties
  };
}