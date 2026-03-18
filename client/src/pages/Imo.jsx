import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { 
  FaMapMarkerAlt, 
  FaShare, 
  FaBed, 
  FaBath, 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone,
  FaHome,
  FaArrowLeft,
  FaHeart,
  FaRegHeart
} from 'react-icons/fa';
import { GiKidSlide } from "react-icons/gi";
import { IoCarSport } from "react-icons/io5";
import SimilarItems from '../components/SimilarItems';
import MapMoz from '../components/MapMoz';
import { Link } from 'react-router-dom';

export default function Imo({ type }) {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  // Contact information
  const contacts = {
    whatsapp: [
      { number: "+25887582662", label: "+258 87 582 662" },
      { number: "+258879281560", label: "+258 87 928 1560" }
    ],
    phone: [
      { number: "844314455", label: "84 431 4455" },
      { number: "+258862541650", label: "+258 86 254 1650" }
    ],
    email: "lichingahouse@mail.com"
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const idParam = `${type}Id`;
        const res = await fetch(`/api/${type}/get/${params[idParam]}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json();

        if (!data || data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setItem(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        console.error(`Erro ao buscar ${type}:`, err);
        setError(true);
        setLoading(false);
      }
    };

    fetchItem();
  }, [params, type]);

  const formatNumber = (num, singular, plural) => {
    return num > 1 ? `${num} ${plural}` : `${num} ${singular}`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#1F2E54] border-t-transparent"></div>
          <p className="mt-6 text-xl font-medium text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <FaHome className="text-6xl text-red-400 mx-auto mb-4" />
          <p className="text-2xl font-bold text-gray-800 mb-2">Oops!</p>
          <p className="text-gray-600">Não foi possível carregar o imóvel</p>
          <Link to="/" className="inline-block mt-6 px-6 py-2 bg-[#1F2E54] text-white rounded-lg hover:bg-[#2A3A6E] transition">
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header simplificado */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-[#1F2E54] hover:text-[#2A3A6E] transition">
            <FaArrowLeft className="text-lg" />
            <span className="font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              {liked ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-gray-500 text-xl" />}
            </button>
            <button
              onClick={copyLink}
              className="p-2 hover:bg-gray-100 rounded-full transition relative"
            >
              <FaShare className="text-gray-600 text-xl" />
              {copied && (
                <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Link copiado!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda - Galeria e Info Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card da galeria */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Swiper
                navigation
                pagination={{ clickable: true }}
                loop
                modules={[Navigation, Pagination]}
                className="rounded-t-2xl"
              >
                {item.imageUrls?.map((url, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[300px] sm:h-[400px]">
                      <img 
                        src={url} 
                        alt={`${item.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Info rápida abaixo da galeria */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.name}</h1>
                    <div className="flex items-center text-gray-500">
                      <FaMapMarkerAlt className="text-[#1F2E54] mr-2 flex-shrink-0" />
                      <span className="text-sm">{item.address}</span>
                    </div>
                  </div>
                </div>

                {/* Características em chips - CORRIGIDO: usando bedroom e bathroom (singular) */}
                <div className="flex flex-wrap gap-3">
                  <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center gap-2">
                    <FaBed className="text-[#1F2E54]" />
                    <span className="font-medium">{formatNumber(item.bedroom, 'Quarto', 'Quartos')}</span>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center gap-2">
                    <FaBath className="text-[#1F2E54]" />
                    <span className="font-medium">{formatNumber(item.bathroom, 'Banho', 'Banhos')}</span>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center gap-2">
                    <IoCarSport className="text-[#1F2E54]" />
                    <span className="font-medium">{item.parking ? 'Parqueamento' : 'Sem parque'}</span>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center gap-2">
                    <GiKidSlide className="text-[#1F2E54]" />
                    <span className="font-medium">{item.finished ? 'Pátio' : 'Sem pátio'}</span>
                  </div>
                </div>

                {/* Preços - Adicionado caso queira mostrar */}
                {(item.regularPrice || item.discountPrice) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {item.discountPrice ? (
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-green-600">
                          {item.discountPrice.toLocaleString()} MT
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {item.regularPrice.toLocaleString()} MT
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-[#1F2E54]">
                        {item.regularPrice?.toLocaleString()} MT
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Descrição detalhada */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Sobre este imóvel</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            {/* Mapa */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Localização</h3>
              <div className="rounded-xl overflow-hidden">
                <MapMoz address={item.address} />
              </div>
            </div>
          </div>

          {/* Coluna direita - Contatos e Similares */}
          <div className="space-y-6">
            {/* Card de contatos - Destaque */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-20">
              <div className="bg-[#1F2E54] p-4">
                <h3 className="text-white font-semibold text-lg">Contactar anunciante</h3>
              </div>
              
              <div className="p-6 space-y-6">
                {/* WhatsApp */}
                <div>
                  <div className="flex items-center gap-2 text-green-600 font-medium mb-3">
                    <FaWhatsapp className="text-xl" />
                    <span>WhatsApp</span>
                  </div>
                  <div className="space-y-2">
                    {contacts.whatsapp.map((contact, idx) => (
                      <a
                        key={idx}
                        href={`https://wa.me/${contact.number.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition text-sm"
                      >
                        {contact.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-medium mb-3">
                    <FaPhone className="text-xl" />
                    <span>Telefone</span>
                  </div>
                  <div className="space-y-2">
                    {contacts.phone.map((contact, idx) => (
                      <a
                        key={idx}
                        href={`tel:${contact.number}`}
                        className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition text-sm"
                      >
                        {contact.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 text-red-600 font-medium mb-3">
                    <FaEnvelope className="text-xl" />
                    <span>Email</span>
                  </div>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="block w-full text-left px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition text-sm break-all"
                  >
                    {contacts.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Imóveis Semelhantes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Imóveis Semelhantes</h3>
              <SimilarItems type={type} id={item._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}