import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signIFailure
} from '../redux/user/userSlice.js';
import { FaEnvelope, FaLock, FaArrowRight, FaPhone } from 'react-icons/fa';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showError, setShowError] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // Limpar erro quando usuário começa a digitar
    if (showError) setShowError(false);
    if (error) dispatch(signInFailure(null));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Por favor, preencha todos os campos'));
      setShowError(true);
      return false;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch(signInFailure('Por favor, insira um email válido'));
      setShowError(true);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulário antes de enviar
    if (!validateForm()) return;
    
    try {
      dispatch(signInStart());
      setShowError(false);
      
      const res = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const contentType = res.headers.get('content-type');

      // Verificar se a resposta é JSON
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Resposta não-JSON:', text);
        throw new Error('Resposta inesperada do servidor');
      }

      const data = await res.json();

      // ✅ VERIFICAÇÃO CORRETA DE ERRO
      if (!res.ok || data.success === false) {
        // Se o status HTTP não for 2xx ou success for false
        const errorMessage = data.message || 
                            data.error || 
                            `Erro ${res.status}: ${res.statusText}`;
        dispatch(signInFailure(errorMessage));
        setShowError(true);
        return;
      }

      // ✅ LOGIN BEM SUCEDIDO
      console.log('Login realizado com sucesso:', data);
      
      // 🔐 Salvar token e dados do usuário
      if (data.access_token || data.token) {
        localStorage.setItem('access_token', data.access_token || data.token);
      }
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Disparar ação de sucesso
      dispatch(signInSuccess(data.user || data));
      
      // Redirecionar para dashboard ou página inicial
      navigate('/dashboard'); // ou '/' se preferir

    } catch (error) {
      console.error('Erro detalhado:', error);
      dispatch(signInFailure('Erro de conexão. Verifique sua internet e tente novamente.'));
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Cabeçalho com gradiente */}
        <div className="bg-gradient-to-r from-[#1F2E54] to-[#2A3A6E] p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
          <p className="text-blue-200 text-sm">Entre para acessar sua conta</p>
        </div>

        {/* Corpo do formulário */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2E54] focus:border-transparent transition"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2E54] focus:border-transparent transition"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Mensagem de erro - APARECE APENAS QUANDO HÁ ERRO REAL */}
            {error && showError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-pulse">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Botão de submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1F2E54] to-[#2A3A6E] text-white py-3 px-4 rounded-lg font-medium hover:from-[#2A3A6E] hover:to-[#1F2E54] transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>A processar...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          {/* Linha divisória */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Precisa de ajuda?</span>
            </div>
          </div>

          {/* Contato com Admin */}
          <div className="text-center space-y-3">
            <p className="text-gray-600 text-sm">
              Não tem conta ou esqueceu a senha?
            </p>
            <Link 
              to="/team" 
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <FaPhone className="text-sm" />
              <span>Contactar Administrador</span>
            </Link>
          </div>

          {/* Links adicionais */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-[#1F2E54] hover:underline">
              ← Voltar para página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}