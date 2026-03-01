// app/contacto/page.js
'use client';

import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6">Contacte-nos</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
        </p>
      </section>

      {/* Informações de Contato */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPhone className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Telefone</h3>
          <p className="text-gray-600">+351 123 456 789</p>
          <p className="text-gray-600">+351 987 654 321</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-gray-600">geral@imoveis.pt</p>
          <p className="text-gray-600">suporte@imoveis.pt</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMapPin className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Morada</h3>
          <p className="text-gray-600">Av. da Liberdade, 123</p>
          <p className="text-gray-600">1250-001 Lisboa, Portugal</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiClock className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Horário</h3>
          <p className="text-gray-600">Seg-Sex: 9h - 19h</p>
          <p className="text-gray-600">Sáb: 9h - 13h</p>
        </div>
      </section>

      {/* Mapa e Formulário */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Mapa */}
        <div className="bg-gray-200 h-96 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.342380535714!2d-9.146347684456156!3d38.77012457959028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19331c5b5c5f5f%3A0x5c5f5f5f5f5f5f5f!2sAv.%20da%20Liberdade%2C%20Lisboa!5e0!3m2!1spt-PT!2spt!4v1620000000000!5m2!1spt-PT!2spt"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Formulário */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Envie-nos uma mensagem</h2>
          
          {submitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assunto *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Como posso anunciar meu imóvel?</h3>
            <p className="text-gray-600">
              Para anunciar seu imóvel, entre em contato com nossa equipe comercial através do telefone ou email.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Qual o prazo para visita?</h3>
            <p className="text-gray-600">
              As visitas são agendadas conforme disponibilidade do proprietário e do cliente.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Preciso criar conta para ver imóveis?</h3>
            <p className="text-gray-600">
              Não, você pode ver os imóveis sem criar conta. No entanto, para salvar favoritos e enviar mensagens, é necessário criar uma conta.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Como funciona o financiamento?</h3>
            <p className="text-gray-600">
              Trabalhamos com as principais instituições bancárias e podemos auxiliar no processo de financiamento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}