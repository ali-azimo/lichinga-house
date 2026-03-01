// app/sobre/page.js
'use client';

import Image from 'next/image';
import { FiUsers, FiHome, FiAward, FiHeart } from 'react-icons/fi';

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Sobre Nós</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Há mais de 10 anos ajudando portugueses a encontrar o imóvel dos seus sonhos
        </p>
      </section>

      {/* Missão */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
          <p className="text-gray-600 mb-4">
            Nossa missão é conectar pessoas aos imóveis dos seus sonhos, oferecendo uma plataforma 
            segura, transparente e inovadora para compra, venda e arrendamento de propriedades em Portugal.
          </p>
          <p className="text-gray-600 mb-4">
            Acreditamos que encontrar um imóvel não precisa ser uma tarefa difícil. Por isso, 
            desenvolvemos uma plataforma intuitiva que facilita a busca e aproxima compradores e vendedores.
          </p>
          <p className="text-gray-600">
            Com mais de 10.000 imóveis cadastrados e milhares de clientes satisfeitos, somos 
            referência no mercado imobiliário português.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-96 rounded-lg flex items-center justify-center">
          <div className="text-white text-8xl">🏠</div>
        </div>
      </section>

      {/* Valores */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Nossos Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHome className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparência</h3>
            <p className="text-gray-600">Negociações claras e honestas</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUsers className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Confiança</h3>
            <p className="text-gray-600">Construímos relações duradouras</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAward className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excelência</h3>
            <p className="text-gray-600">Serviço de alta qualidade</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Paixão</h3>
            <p className="text-gray-600">Amor pelo que fazemos</p>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="bg-blue-600 text-white py-16 rounded-lg mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10.000+</div>
            <div className="text-blue-100">Imóveis Cadastrados</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">5.000+</div>
            <div className="text-blue-100">Clientes Satisfeitos</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10+</div>
            <div className="text-blue-100">Anos de Experiência</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">18</div>
            <div className="text-blue-100">Distritos Atendidos</div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Nossa Equipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-6xl text-white">👤</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Nome do Colaborador</h3>
              <p className="text-gray-600 mb-2">Cargo</p>
              <p className="text-gray-500 text-sm">
                Descrição breve sobre o colaborador e sua experiência.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}