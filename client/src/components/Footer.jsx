import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaMobile,
  FaPhoneAlt
} from "react-icons/fa";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white pt-12 pb-6 mt-20" style={{
      boxShadow: "0 -10px 30px -5px rgba(0, 0, 0, 0.1), 0 -8px 10px -6px rgba(0, 174, 239, 0.05)"
    }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logotipo e descrição */}
        <div>
          <img src={logo} alt="Logo Lichinga House" className="w-32 mb-4" />
          <p className="text-gray-600 text-sm mt-1">
            Realizando Sonhos, Construindo Futuros
          </p>
          <div className="flex gap-4 mt-4 text-2xl text-[#1F2E54]">
            <a href="#" className="hover:text-[#00AEEF] transition duration-200 transform hover:scale-110">
              <FaFacebook />
            </a>
            <a href="https://chat.whatsapp.com/L2ylfd89TG8JymjjG65sft" className="hover:text-[#00AEEF] transition duration-200 transform hover:scale-110">
              <FaWhatsapp />
            </a>
            <a href="#" className="hover:text-[#00AEEF] transition duration-200 transform hover:scale-110">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#00AEEF] transition duration-200 transform hover:scale-110">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Links rápidos */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#1F2E54] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#00AEEF]">
            Links Rápidos
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Início</Link></li>
            <li><Link to="/search" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Imóveis</Link></li>
            <li><Link to="/about" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Sobre Nós</Link></li>
            <li><Link to="/imo-home" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Imobiliária & Investimentos</Link></li>
            <li><Link to="/agri" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Agro-Pecuária</Link></li>
            <li><Link to="/saude" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Saúde & meio ambiente</Link></li>
            <li><Link to="/minin" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Mineração</Link></li>
          </ul>
        </div>

        {/* Serviços */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#1F2E54] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#00AEEF]">
            Serviços
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="https://www.bgs-imo.com/search?type=sale" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Compra e Venda</a></li>
            <li><a href="https://www.bgs-imo.com/search?type=sale" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Arrendamento</a></li>
            <li><a href="https://www.bgs-imo.com/team" className="hover:text-[#00AEEF] transition duration-200 hover:pl-1">Consultoria Imobiliária</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#1F2E54] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#00AEEF]">
            Contacto
          </h4>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-[#00AEEF] mt-1 flex-shrink-0" />
              <span>Cidade de Lichinga, Moçambique</span>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#00AEEF] flex-shrink-0" />
              <a href="mailto:lichingahouse@mail.com" className="hover:text-[#00AEEF] transition">
                lichingahouse@mail.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-[#00AEEF] flex-shrink-0" />
              <span>874314455</span>
            </p>
            <p className="flex items-center gap-2">
              <FaMobile className="text-[#00AEEF] flex-shrink-0" />
              <span>87,258 87 928 1560</span>
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#00AEEF] flex-shrink-0" />
              <span>+258 86 254 1650</span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-200 pt-6">
        &copy; 2025 Lichinga House. Todos os direitos reservados.
      </div>
    </footer>
  );
}