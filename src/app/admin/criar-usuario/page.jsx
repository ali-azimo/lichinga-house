// app/admin/criar-usuario/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

export default function CriarUsuarioPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    // Dados básicos
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Dados pessoais
    birthDate: '',
    documentId: '',
    profession: '',
    
    // Endereço
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Portugal'
    },
    
    // Permissões
    role: 'user',
    
    // Configurações
    preferences: {
      language: 'pt',
      currency: 'EUR',
      notifications: {
        email: true,
        sms: false
      }
    }
  });

  // Verificar permissão
  if (!user || !isAdmin) {
    router.push('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Campos aninhados (ex: address.street)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Criar no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const firebaseUser = userCredential.user;
      
      // 2. Preparar dados para MongoDB
      const userData = {
        uid: firebaseUser.uid,
        email: formData.email,
        displayName: formData.displayName,
        phone: formData.phone,
        photoURL: '',
        address: formData.address,
        birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
        documentId: formData.documentId,
        profession: formData.profession,
        role: formData.role,
        canCreateProperties: formData.role === 'property_creator' || formData.role === 'admin',
        preferences: formData.preferences,
        provider: 'email',
        isVerified: true,
        createdBy: user.mongoId
      };
      
      // 3. Salvar no MongoDB
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar usuário');
      }
      
      setSuccess('Usuário criado com sucesso!');
      
      // Limpar formulário
      setFormData({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        birthDate: '',
        documentId: '',
        profession: '',
        address: {
          street: '',
          city: '',
          postalCode: '',
          country: 'Portugal'
        },
        role: 'user',
        preferences: {
          language: 'pt',
          currency: 'EUR',
          notifications: {
            email: true,
            sms: false
          }
        }
      });
      
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Criar Novo Usuário</h1>
      
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
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Dados Básicos */}
        <div>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Dados Básicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="João Silva"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="joao@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+351 123 456 789"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Dados Pessoais */}
        <div>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Dados Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BI/CC
              </label>
              <input
                type="text"
                name="documentId"
                value={formData.documentId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12345678"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profissão
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Engenheiro"
              />
            </div>
          </div>
        </div>
        
        {/* Endereço */}
        <div>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Endereço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rua
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Av. da Liberdade, 123"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Lisboa"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal
              </label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1250-001"
              />
            </div>
          </div>
        </div>
        
        {/* Permissões */}
        <div>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Permissões</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Usuário *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Usuário Comum (ver, like, mensagens)</option>
              <option value="property_creator">Criador de Imóveis (pode cadastrar imóveis)</option>
              <option value="admin">Administrador (acesso total)</option>
            </select>
          </div>
          
          {/* Preview de permissões */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Permissões do usuário:</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Visualizar imóveis</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Dar like</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Enviar mensagens</span>
              </li>
              <li className="flex items-center space-x-2">
                {formData.role === 'user' ? (
                  <>
                    <span className="text-red-500">✗</span>
                    <span>Cadastrar imóveis</span>
                  </>
                ) : (
                  <>
                    <span className="text-green-500">✓</span>
                    <span>Cadastrar imóveis</span>
                  </>
                )}
              </li>
              {formData.role === 'admin' && (
                <>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Gerenciar usuários</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Gerenciar imóveis</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        {/* Botões */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Criando usuário...' : 'Criar Usuário'}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/admin/usuarios')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}