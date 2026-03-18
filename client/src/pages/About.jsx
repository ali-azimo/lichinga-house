import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaBalanceScale,
  FaEye,
  FaHandshake,
  FaKey,
  FaMapSigns,
  FaBullseye,
  FaRocket,
  FaBuilding,
  FaHome,
  FaTractor,
  FaHardHat,
  FaLeaf,
  FaCity,
  FaSeedling,
  FaTools,
  FaChartLine
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

const pontos = [
  {
    titulo: 'Visibilidade com propósito',
    texto: 'Mais do que gerir teu negócio, agregamo-lo valor no mercado diante de potenciais interessados.',
    icone: <FaEye className="text-[#3b3f52] text-4xl" />,
  },
  {
    titulo: 'Parceria de confiança',
    texto: 'Conduzimos o processo com integridade, responsabilidade e confidencialidade.',
    icone: <FaHandshake className="text-[#3b3f52] text-4xl" />,
  },
  {
    titulo: 'Experiência Local Autêntica',
    texto: 'Conhecemos o valor de cada bairro e comunidade de Lichinga. É com este conhecimento que guiamos cada negócio.',
    icone: <FaMapSigns className="text-[#3b3f52] text-4xl" />,
  },
  {
    titulo: 'Processo claro e Ágil',
    texto: 'Reconhecendo que o tempo é um recurso escasso, tratamos do teu negócio com celeridade, sem complicações, apoio dedicado e sem promessas exageradas. Somos pragmáticos e trazemos apenas resultados e clareza.',
    icone: <FaKey className="text-[#3b3f52] text-4xl" />,
  },
  {
    titulo: 'Equilíbrio entre Valor e Tempo',
    texto: 'Aliamos avaliação criteriosa ao ritmo do mercado local, para garantir decisões equilibradas e vantajosas.',
    icone: <FaBalanceScale className="text-[#3b3f52] text-4xl" />,
  },
];

// Foco principal em Lichinga com potencial de expansão
const servicosPrincipais = [
  {
    nome: "Imobiliária",
    icone: <FaHome className="text-4xl text-[#00AEEF]" />,
    descricao: "Compra, venda e arrendamento de imóveis residenciais e comerciais em Lichinga e arredores.",
    areas: ["Casas", "Apartamentos", "Terrenos", "Lojas", "Escritórios"]
  },
  {
    nome: "Construção Civil",
    icone: <FaHardHat className="text-4xl text-[#00AEEF]" />,
    descricao: "Construção, reabilitação e manutenção de imóveis com qualidade e compromisso.",
    areas: ["Construção nova", "Reabilitações", "Acabamentos", "Projetos"]
  },
  {
    nome: "Campo Agrícola",
    icone: <FaTractor className="text-4xl text-[#00AEEF]" />,
    descricao: "Desenvolvimento e gestão de propriedades agrícolas, consultoria e investimentos rurais.",
    areas: ["Fazendas", "Plantações", "Gestão agrícola", "Consultoria"]
  }
];

// Províncias com ênfase em Lichinga (Niassa)
const provincias = [
  {
    nome: "Niassa - Lichinga",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=870&auto=format&fit=crop",
    texto: "Nossa sede e foco principal. Atuamos em toda a província de Niassa com serviços imobiliários, construção e projetos agrícolas, impulsionando o desenvolvimento local.",
    destaque: true
  },
  {
    nome: "Cabo Delgado",
    imagem: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=871&auto=format&fit=crop",
    texto: "Em expansão: imóveis para turismo, mineração e residenciais, com potencial para projetos agrícolas.",
  },
  {
    nome: "Nampula",
    imagem: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=870&auto=format&fit=crop",
    texto: "Oportunidades imobiliárias e agrícolas em crescimento. Expansão prevista para 2026.",
  },
  {
    nome: "Zambézia",
    imagem: "https://images.unsplash.com/photo-1464226180484-4a89c2119ae9?q=80&w=870&auto=format&fit=crop",
    texto: "Forte potencial agrícola. Em estudo para expansão dos serviços de consultoria rural.",
  },
  {
    nome: "Tete",
    imagem: "https://images.unsplash.com/photo-1504910231110-6d813b76b821?q=80&w=870&auto=format&fit=crop",
    texto: "Mercado imobiliário aquecido. Planejamento para entrada em 2026 com foco em construção.",
  },
  {
    nome: "Maputo",
    imagem: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=864&auto=format&fit=crop",
    texto: "Parcerias estratégicas para expandir nossos serviços de consultoria imobiliária.",
  }
];

export default function ParceriaImobiliaria() {
  return (
    <div className="bg-gray-50">

      {/* Serviços principais */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-[#1F2E54] mb-4">
          Nossos Serviços em Lichinga
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Com 2 anos de atuação local, oferecemos soluções completas nas áreas que dominamos,
          com potencial de expansão para todo o país.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {servicosPrincipais.map((servico, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition group">
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition">
                {servico.icone}
              </div>
              <h3 className="text-2xl font-semibold text-[#1F2E54] mb-3 text-center">
                {servico.nome}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {servico.descricao}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {servico.areas.map((area, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expansão e Crescimento */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1F2E54] mb-6">
                Crescendo com Lichinga, Expandindo para Moçambique
              </h2>
              <p className="text-gray-600 mb-4">
                Em apenas 2 anos, consolidamos nossa presença em Lichinga e província de Niassa, 
                construindo relações de confiança e entregando resultados concretos nos setores 
                imobiliário, construção e agrícola.
              </p>
              <p className="text-gray-600 mb-6">
                Agora, preparamos nossa expansão para outras províncias, levando nossa expertise 
                e compromisso com qualidade para todo o país, sem perder nossas raízes e 
                conhecimento local.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1F2E54] text-white p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm">Imóveis Negociados</div>
                </div>
                <div className="bg-[#00AEEF] text-white p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold">30+</div>
                  <div className="text-sm">Projetos Construídos</div>
                </div>
                <div className="bg-[#1F2E54] text-white p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-sm">Hectares Agrícolas</div>
                </div>
                <div className="bg-[#00AEEF] text-white p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm">Províncias em Expansão</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=773&auto=format&fit=crop" 
                alt="Imóveis em Lichinga"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=871&auto=format&fit=crop" 
                alt="Construção civil"
                className="rounded-lg shadow-lg h-48 w-full object-cover mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1032&auto=format&fit=crop" 
                alt="Campo agrícola"
                className="rounded-lg shadow-lg h-48 w-full object-cover -mt-4"
              />
              <img 
                src="https://images.unsplash.com/photo-1464219787347-5b5c3a0a8399?q=80&w=870&auto=format&fit=crop" 
                alt="Expansão"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE A LICHINGA HOUSE */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaBuilding className="text-4xl text-[#1F2E54] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-[#1F2E54]">
              Quem Somos
            </h3>
            <p className="text-gray-700 text-sm">
              A Lichinga House é uma empresa moçambicana com 2 anos de experiência, dedicada à prestação 
              de serviços de qualidade nos setores Imobiliário, Construção Civil e Agrícola. Nascidos em 
              Lichinga, província de Niassa, temos como objetivo impulsionar o desenvolvimento local 
              e expandir nossa atuação para todo o país.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaBullseye className="text-4xl text-[#1F2E54] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-[#1F2E54]">
              Missão
            </h3>
            <p className="text-gray-700 text-sm">
              Com raízes firmes em Lichinga e visão de crescimento, a Lichinga House tem como missão 
              oferecer soluções inovadoras e sustentáveis nos setores imobiliário, construção e agrícola, 
              contribuindo para o desenvolvimento econômico e social das comunidades onde atuamos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaRocket className="text-4xl text-[#1F2E54] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-[#1F2E54]">Visão</h3>
            <p className="text-gray-700 text-sm">
              Ser referência nacional nos setores imobiliário, construção e agrícola até 2030, 
              mantendo nossas raízes em Lichinga e levando qualidade, inovação e compromisso 
              para todas as províncias de Moçambique.
            </p>
          </div>
        </div>
      </section>

      {/* Swiper das províncias - com destaque para Lichinga */}
      <div className="py-10 px-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg mb-16">
        <h2 className="text-2xl font-bold text-center text-[#1F2E54] mb-4">
          Presença Atual e Expansão Futura
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Atualmente com foco principal em Lichinga e província de Niassa, preparamos nossa expansão 
          para levar nossos serviços a todo Moçambique.
        </p>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {provincias.map(({ nome, imagem, texto, destaque }, idx) => (
            <SwiperSlide key={idx}>
              <div className={`rounded-2xl shadow hover:shadow-xl transition p-4 flex flex-col h-full ${
                destaque ? 'border-2 border-[#00AEEF] bg-blue-50' : 'bg-white'
              }`}>
                <div className="relative">
                  <img
                    src={imagem}
                    alt={nome}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                  {destaque && (
                    <span className="absolute top-2 right-2 bg-[#00AEEF] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Sede
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-[#1F2E54] mb-2">
                  {nome}
                </h3>
                <p className="text-gray-600 text-sm flex-grow">{texto}</p>
                {!destaque && nome !== "Niassa - Lichinga" && (
                  <div className="mt-3 text-xs text-[#00AEEF] font-semibold">
                    ⏳ Expansão prevista: 2026
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Seção de Vantagens */}
      <section
        id="vantagens"
        className="bg-[#f7f7f7] w-full py-24 px-6 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-[#1F2E54] mb-12">
          Por que escolher a Lichinga House?
        </h2>
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pontos.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
            >
              <div className="mb-4">{item.icone}</div>
              <h3 className="text-xl font-semibold text-[#1F2E54] mb-2">
                {item.titulo}
              </h3>
              <p className="text-gray-600 text-sm">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}