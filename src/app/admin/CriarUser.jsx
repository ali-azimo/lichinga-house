// app/admin/CriarUser.jsx
'use client';

import { useState } from 'react';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { USER_ROLES } from '@/libs/models/UserTypes';

export default function CriarUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    phone: '',
    role: USER_ROLES.USER,
    canCreateProperties: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Determinar permissões baseado no role
      const canCreateProperties = formData.role === USER_ROLES.PROPERTY_CREATOR || 
                                  formData.role === USER_ROLES.ADMIN;

      // Salvar dados no Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: formData.displayName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        canCreateProperties,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        favorites: [],
        messages: []
      });

      setSuccess('Usuário criado com sucesso!');
      setFormData({
        email: '',
        password: '',
        displayName: '',
        phone: '',
        role: USER_ROLES.USER,
        canCreateProperties: false
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Criar Novo Usuário</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome *
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Usuário *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={USER_ROLES.USER}>Usuário Comum (só visualiza, like e mensagens)</option>
            <option value={USER_ROLES.PROPERTY_CREATOR}>Criador de Imóveis (pode cadastrar produtos)</option>
            <option value={USER_ROLES.ADMIN}>Administrador (acesso total)</option>
          </select>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Permissões do usuário:</h3>
          <ul className="text-sm space-y-1">
            <li>✓ Visualizar imóveis: <span className="text-green-600">Sim</span></li>
            <li>✓ Dar like em imóveis: <span className="text-green-600">Sim</span></li>
            <li>✓ Enviar mensagens: <span className="text-green-600">Sim</span></li>
            <li>✗ Cadastrar imóveis: 
              <span className={formData.role === USER_ROLES.USER ? 'text-red-600' : 'text-green-600'}>
                {formData.role === USER_ROLES.USER ? ' Não' : ' Sim'}
              </span>
            </li>
            {formData.role === USER_ROLES.ADMIN && (
              <li>✓ Gerenciar usuários: <span className="text-green-600">Sim</span></li>
            )}
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Usuário'}
        </button>
      </form>
    </div>
  );
}