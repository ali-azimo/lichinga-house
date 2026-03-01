// app/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, googleProvider, facebookProvider } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função para lidar com o login bem-sucedido
  const handleLoginSuccess = () => {
    // Redirecionar para a página inicial
    router.push('/');
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleLoginSuccess();
    } catch (error) {
      console.error('Erro no login:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Usuário não encontrado');
          break;
        case 'auth/wrong-password':
          setError('Senha incorreta');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/invalid-credential':
          setError('Email ou senha inválidos');
          break;
        case 'auth/too-many-requests':
          setError('Muitas tentativas. Tente novamente mais tarde.');
          break;
        default:
          setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      handleLoginSuccess();
    } catch (error) {
      console.error('Erro no login com Google:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Popup fechado antes de completar o login');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Ignorar cancelamento
      } else {
        setError('Erro ao fazer login com Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithPopup(auth, facebookProvider);
      handleLoginSuccess();
    } catch (error) {
      console.error('Erro no login com Facebook:', error);
      setError('Erro ao fazer login com Facebook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header com gradiente */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Bem-vindo de volta
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Faça login para continuar
            </p>
          </div>

          {/* Corpo do formulário */}
          <div className="px-8 py-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Formulário de Email */}
            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Lembrar-me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
              >
                {loading ? 'Entrando...' : 'Entrar com Email'}
              </button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou continue com</span>
              </div>
            </div>

            {/* Botões sociais */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
              >
                <FcGoogle className="h-5 w-5" />
                <span>Google</span>
              </button>

              <button
                onClick={handleFacebookLogin}
                disabled={loading}
                className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
              >
                <FaFacebook className="h-5 w-5 text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>

            {/* Link para registro */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Registre-se gratuitamente
              </Link>
            </p>
          </div>
        </div>

        {/* Mensagem de boas-vindas */}
        <p className="text-center text-sm text-gray-600">
          Ao fazer login, você concorda com nossos{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}