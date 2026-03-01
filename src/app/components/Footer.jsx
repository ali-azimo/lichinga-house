'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sobre Nós</h3>
            <p className="text-gray-400">
              Somos uma plataforma dedicada a conectar pessoas aos seus imóveis dos sonhos.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/venda" className="text-gray-400 hover:text-white">Venda</Link></li>
              <li><Link href="/arrendamento" className="text-gray-400 hover:text-white">Arrendamento</Link></li>
              <li><Link href="/terreno" className="text-gray-400 hover:text-white">Terreno</Link></li>
              <li><Link href="/campo" className="text-gray-400 hover:text-white">Campo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Informações</h3>
            <ul className="space-y-2">
              <li><Link href="/sobre" className="text-gray-400 hover:text-white">Sobre</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-white">Contacto</Link></li>
              <li><Link href="/privacidade" className="text-gray-400 hover:text-white">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="text-gray-400 hover:text-white">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiYoutube size={24} />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">
                &copy; {currentYear} Imóveis. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;