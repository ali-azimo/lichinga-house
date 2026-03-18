import React, { useRef, useState } from "react";
import { FaEnvelope, FaCheck, FaFacebook, FaWhatsapp, FaLinkedin, FaGithub, FaUserTie, FaCode, FaChartLine } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import patricio from "../assets/img/patricio.jpeg";
import ali from "../assets/img/Azimo.jpg";
import virgilio from "../assets/img/virgilio.jpeg";
import logo from "../assets/img/logo.png";

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
  github: FaGithub,
};

export default function Team() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const teamMembers = [
    {
      name: "Patrício Clemente Chapelemo",
      role: "Contabilidade & Auditoria | Desenvolvedor Web",
      description: [
        "Formado em Contabilidade e Auditoria, Patrício alia sua sólida formação financeira com habilidades em desenvolvimento web. Responsável pela gestão contábil e financeira da Lichinga House, além de contribuir no desenvolvimento e manutenção das plataformas digitais da empresa. Sua visão analítica e técnica garante precisão nos processos financeiros e inovação nas soluções tecnológicas.",
        "• Contabilidade e Auditoria",
        "• Desenvolvimento Web Full Stack",
        "• Análise Financeira"
      ],
      icon: <FaUserTie className="text-2xl text-[#00AEEF]" />,
      social: {
        linkedin: "https://www.linkedin.com/in/patricio-chapelemo",
        github: "https://github.com/patricio-chapelemo",
        whatsapp: "https://wa.me/25884XXXXXXXX",
      },
      image: patricio,
    },
    {
      name: "Ali Azimo",
      role: "RH | Contabilidade & Fiscalidade | Programador Web | Tradutor",
      description: [
        "Ali Azimo é um profissional multidisciplinar que combina expertise em Recursos Humanos, Contabilidade e Fiscalidade com habilidades técnicas em programação web. Atua como tradutor de língua inglesa, facilitando a comunicação em projetos internacionais. Sua versatilidade permite à Lichinga House oferecer serviços integrados e de alta qualidade.",
        "• Técnico de RH",
        "• Contabilidade e Fiscalidade",
        "• Programação Web",
        "• Tradução Inglês-Português"
      ],
      icon: <FaCode className="text-2xl text-[#00AEEF]" />,
      social: {
        whatsapp: "https://wa.me/258874314455",
        linkedin: "https://www.linkedin.com/in/ali-azimo-0240142b0/",
        github: "https://github.com/ali-azimo",
      },
      image: ali,
    },
    {
      name: "Virgílio Mário Massamba",
      role: "Gestor da Lichinga House",
      description: [
        "Como Gestor da Lichinga House, Virgílio Mário Massamba lidera a empresa com visão estratégica e conhecimento multidisciplinar. Especialista em Marketing, Contabilidade e Fiscalidade, ele coordena as operações nos setores imobiliário, construção e agrícola, garantindo que cada projeto atenda aos mais altos padrões de qualidade e compromisso com os clientes.",
        "• Marketing Estratégico",
        "• Contabilidade e Fiscalidade",
        "• Gestão de Negócios",
        "• Expansão de Mercado"
      ],
      icon: <FaChartLine className="text-2xl text-[#00AEEF]" />,
      social: {
        linkedin: "https://www.linkedin.com/in/virgilio-massamba",
        whatsapp: "https://wa.me/25886XXXXXXXX",
      },
      image: virgilio,
    },
  ];

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await emailjs.sendForm(
        "service_390rh7s",
        "template_6aib88t",
        form.current,
        "F1D4D-0fhmjkz2noB"
      );

      setIsSuccess(true);
      form.current.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError("Erro ao enviar. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header com logo */}
      <div className="flex flex-col items-center mb-12">
        <img src={logo} alt="Lichinga House" className="w-32 mb-6" />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1F2E54] mb-4">
          Equipa Lichinga House
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg text-center">
          Conheça os profissionais multidisciplinares que fazem da Lichinga House 
          uma referência em imobiliária, construção e desenvolvimento agrícola em Moçambique.
        </p>
      </div>

      {/* Grid da equipa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
          >
            {/* Header com imagem e ícone */}
            <div className="relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-72 object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x400?text=Photo";
                }}
              />
              <div className="absolute top-4 right-4 bg-[#1F2E54] text-white p-3 rounded-full shadow-lg">
                {member.icon}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1F2E54] mb-1">
                {member.name}
              </h2>
              <p className="text-[#00AEEF] font-medium mb-4 text-sm">
                {member.role}
              </p>
              
              {/* Descrição em formato de lista */}
              <div className="space-y-3 mb-4">
                {member.description.map((item, i) => (
                  <div key={i} className={i === 0 ? 'text-gray-700 text-sm' : ''}>
                    {i === 0 ? (
                      <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    ) : (
                      <p className="text-gray-600 text-sm pl-3 border-l-2 border-[#00AEEF]">
                        {item}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Redes Sociais */}
              <div className="flex justify-start gap-4 mt-4 text-xl text-[#1F2E54]">
                {Object.entries(member.social).map(([platform, url]) => {
                  const Icon = SOCIAL_ICONS[platform];
                  return Icon ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00AEEF] transition-colors duration-200 transform hover:scale-110"
                      aria-label={`${platform} de ${member.name}`}
                    >
                      <Icon />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas da Equipe */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-r from-[#1F2E54] to-[#00AEEF] text-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="text-3xl font-bold">3</div>
          <div className="text-sm opacity-90">Profissionais</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">12+</div>
          <div className="text-sm opacity-90">Competências</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">2</div>
          <div className="text-sm opacity-90">Anos de Experiência</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">100%</div>
          <div className="text-sm opacity-90">Compromisso Local</div>
        </div>
      </div>

      {/* Formulário de Contato */}
      <div className="mt-16 bg-white p-6 md:p-10 rounded-2xl shadow-xl">
        <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center text-[#1F2E54]">
          Fale com a Nossa Equipa
        </h3>

        <form className="space-y-6" ref={form} onSubmit={sendEmail}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm text-gray-700 mb-1 font-medium">
                Nome Completo
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Seu nome"
                required
                className="p-3 rounded-xl border border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="useremail" className="text-sm text-gray-700 mb-1 font-medium">
                Email
              </label>
              <input
                id="useremail"
                type="email"
                name="useremail"
                placeholder="Seu email"
                required
                className="p-3 rounded-xl border border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="subject" className="text-sm text-gray-700 mb-1 font-medium">
                Assunto
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Assunto da mensagem"
                required
                className="p-3 rounded-xl border border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm text-gray-700 mb-1 font-medium">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Escreva a sua mensagem..."
              required
              className="p-3 rounded-xl border border-gray-300 bg-gray-50 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition"
            ></textarea>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}
          
          {isSuccess && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <FaCheck className="flex-shrink-0" />
              <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-4 rounded-xl font-bold transition duration-200 flex items-center justify-center gap-2 text-white ${
              isSubmitting 
                ? "bg-[#1F2E54]/70 cursor-not-allowed" 
                : "bg-[#1F2E54] hover:bg-[#2a3a6e]"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <FaEnvelope />
                Enviar Mensagem
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}