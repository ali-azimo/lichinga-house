import { useState, useEffect } from 'react';
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
  const [emailExists, setEmailExists] = useState(true);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [localLoading, setLocalLoading] = useState(false); // Loading local para não depender apenas do Redux
  
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Função para verificar se o email existe
  const checkEmailExists = async (email) => {
    if (!email || !email.includes('@')) return;
    
    setCheckingEmail(true);
    try {
      // IMPORTANTE: Aqui você precisa ter este endpoint no backend
      const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setEmailExists(data.exists);
        if (!data.exists) {
          dispatch(signIFailure('Este email não está cadastrado no sistema'));
          setShowError(true);
        } else {
          setShowError(false);
          dispatch(signIFailure(null));
        }
      }
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      // Se não conseguir verificar, assume que existe para não bloquear
      setEmailExists(true);
    } finally {
      setCheckingEmail(false);
    }
  };

  // Debounce para verificar email
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email && formData.email.includes('@')) {
        checkEmailExists(formData.email);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
    // Limpar erro quando usuário começa a digitar
    if (showError) setShowError(false);
    if (error) dispatch(signIFailure(null));
    
    if (e.target.id === 'email') {
      setEmailExists(true);
    }
  };

  const validateForm = () => {
    // Verificar campos vazios PRIMEIRO
    if (!formData.email || !formData.password) {
      dispatch(signIFailure('Por favor, preencha todos os campos'));
      setShowError(true);
      return false;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch(signIFailure('Por favor, insira um email válido'));
      setShowError(true);
      return false;
    }
    
    // Verificar se o email existe (APÓS validação básica)
    if (!emailExists) {
      dispatch(signIFailure('Este email não está cadastrado no sistema'));
      setShowError(true);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // VALIDAÇÃO ANTES DE QUALQUER COISA
    if (!validateForm()) {
      return; // IMPORTANTE: Retorna aqui sem iniciar loading
    }
    
    // Se ainda está verificando email, não prossegue
    if (checkingEmail) {
      dispatch(signIFailure('Aguardando verificação do email...'));
      return;
    }
    
    // SÓ INICIA O LOADING DEPOIS DE TODAS AS VALIDAÇÕES
    try {
      dispatch(signInStart());
      setLocalLoading(true);
      setShowError(false);
      
      console.log('Enviando dados de login:', { email: formData.email });
      
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

      // Verificar erro específico de email não encontrado
      if (data.message?.toLowerCase().includes('não encontrado') || 
          data.message?.toLowerCase().includes('não cadastrado') ||
          data.message?.toLowerCase().includes('invalid credentials') ||
          data.error?.toLowerCase().includes('não existe')) {
        
        setEmailExists(false);
        dispatch(signIFailure('Email não cadastrado. Por favor, verifique ou contacte o administrador.'));
        setShowError(true);
        setLocalLoading(false);
        return;
      }

      // Verificar outros erros
      if (!res.ok || data.success === false) {
        const errorMessage = data.message || 
                            data.error || 
                            `Erro ${res.status}: ${res.statusText}`;
        dispatch(signIFailure(errorMessage));
        setShowError(true);
        setLocalLoading(false);
        return;
      }

      // LOGIN BEM SUCEDIDO
      console.log('Login realizado com sucesso:', data);
      
      // Salvar token e dados
      if (data.access_token || data.token) {
        localStorage.setItem('access_token', data.access_token || data.token);
      }
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      dispatch(signInSuccess(data.user || data));
      navigate('/dashboard');

    } catch (error) {
      console.error('Erro detalhado:', error);
      dispatch(signIFailure('Erro de conexão. Verifique sua internet e tente novamente.'));
      setShowError(true);
      setLocalLoading(false);
    }
  };

  // Combine loading do Redux com loading local
  const isLoading = loading || localLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-[#1F2E54] to-[#2A3A6E] p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
          <p className="text-blue-200 text-sm">Entre para acessar sua conta</p>
        </div>

        {/* Corpo */}
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
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2E54] focus:border-transparent transition ${
                    !emailExists && formData.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {checkingEmail && formData.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
                {!emailExists && formData.email && !checkingEmail && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {!emailExists && formData.email && !checkingEmail && (
                <p className="mt-1 text-xs text-red-600">
                  Este email não está cadastrado. <Link to="/team" className="underline font-medium">Contacte o administrador</Link>
                </p>
              )}
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
                  disabled={isLoading || (!emailExists && formData.email !== '')}
                />
              </div>
            </div>

            {/* Mensagem de erro */}
            {error && showError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
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
              disabled={isLoading || checkingEmail || (!emailExists && formData.email !== '')}
              className="w-full bg-gradient-to-r from-[#1F2E54] to-[#2A3A6E] text-white py-3 px-4 rounded-lg font-medium hover:from-[#2A3A6E] hover:to-[#1F2E54] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>A processar...</span>
                </>
              ) : checkingEmail ? (
                <span>Verificando email...</span>
              ) : !emailExists && formData.email ? (
                <span>Email não cadastrado</span>
              ) : (
                <>
                  <span>Entrar</span>
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          {/* Rodapé */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Precisa de ajuda?</span>
            </div>
          </div>

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