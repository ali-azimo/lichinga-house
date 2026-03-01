// app/admin/usuarios/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { FiEdit2, FiTrash2, FiUserPlus, FiSearch } from 'react-icons/fi';

export default function ListaUsuariosPage() {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    if (!isAdmin) return;
    fetchUsers();
  }, [isAdmin, pagination.page, roleFilter, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...(roleFilter && { role: roleFilter }),
        ...(search && { search })
      });

      const response = await fetch(`/api/users?${params}`);
      const data = await response.json();
      
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800',
      property_creator: 'bg-green-100 text-green-800',
      user: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      admin: 'Admin',
      property_creator: 'Criador',
      user: 'Usuário'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[role]}`}>
        {labels[role]}
      </span>
    );
  };

  if (!isAdmin) {
    return <div>Acesso negado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
        <Link
          href="/admin/criar-usuario"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiUserPlus />
          <span>Novo Usuário</span>
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Todos os tipos</option>
            <option value="admin">Administradores</option>
            <option value="property_creator">Criadores</option>
            <option value="user">Usuários</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado em</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((userItem) => (
                  <tr key={userItem._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {userItem.photoURL ? (
                          <img
                            src={userItem.photoURL}
                            alt={userItem.displayName}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                            <span className="text-gray-600 text-sm">
                              {userItem.displayName?.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{userItem.displayName}</div>
                          <div className="text-sm text-gray-500">{userItem.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{userItem.phone || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(userItem.role)}
                    </td>
                    <td className="px-6 py-4">
                      {userItem.isActive ? (
                        <span className="text-green-600">Ativo</span>
                      ) : (
                        <span className="text-red-600">Inativo</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(userItem.createdAt).toLocaleDateString('pt-PT')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/editar-usuario/${userItem._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit2 />
                        </Link>
                        {userItem._id !== user?.mongoId && (
                          <button
                            onClick={() => handleDelete(userItem._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {pagination.pages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                  className={`px-4 py-2 rounded ${
                    pagination.page === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}