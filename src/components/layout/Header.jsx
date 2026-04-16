import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SocialDropdown from "./SocialDropdown";
import { motion } from "framer-motion";

export default function Header() {

  const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.05, // Tiempo entre la aparición de cada letra
      delayChildren: 0.2     // Espera un poco antes de empezar
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      damping: 12, 
      stiffness: 200 
    } 
  },
};

const Title = () => {
  // Dividimos las palabras para aplicarles colores distintos
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const word1 = "Erasmus".split("");
  const word2 = "Dreamland".split("");

  useEffect(() => {
    // Comprobamos si ya se mostró la animación en esta sesión
    const hasAnimated = sessionStorage.getItem("hasAnimatedTitle");
    
    if (!hasAnimated) {
      setShouldAnimate(true);
      // Guardamos en sessionStorage para que si refresca la página 
      // o vuelve mañana, sí se vea, pero no al navegar entre pestañas.
      sessionStorage.setItem("hasAnimatedTitle", "true");
    }
  }, []);

  return (
    <motion.h1 
      className="text-lg font-semibold tracking-wide hidden md:block"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Grupo 1: Erasmus (Blanco) */}
      <span className="text-white">
        {word1.map((letter, i) => (
          <motion.span key={`w1-${i}`} variants={letterVariants} className="inline-block">
            {letter}
          </motion.span>
        ))}
      </span>

      {/* Espacio entre palabras */}
      <span className="inline-block">&nbsp;</span>

      {/* Grupo 2: Dreamland (Color personalizado) */}
      <span className="text-dreamland">
        {word2.map((letter, i) => (
          <motion.span key={`w2-${i}`} variants={letterVariants} className="inline-block">
            {letter}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
};

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    
    <header className="bg-neutral-500 text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <img className="w-28" src="/logo.png" alt="Erasmus Dreamland logo" />
          <Title />
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={`relative group header-link ${currentPath === '/' ? 'text-dreamland' : ''}`}>Inicio<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === '/' ? 'w-full' : ''}`}></span></Link>
          <Link to="/about" className={`relative group header-link ${currentPath === '/about' ? 'text-dreamland' : ''}`}>Sobre nosotros<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === '/about' ? 'w-full' : ''}`}></span></Link>
          <Link to="/tickets" className={`relative group header-link ${currentPath === '/tickets' ? 'text-dreamland' : ''}`}>Comprar entradas<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === '/tickets' ? 'w-full' : ''}`}></span></Link>
          <Link to="/gallery" className={`relative group header-link ${currentPath === '/gallery' ? 'text-dreamland' : ''}`}>Fotos<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === '/gallery' ? 'w-full' : ''}`}></span></Link>
          <SocialDropdown currentPath={currentPath} />
          <Link to="/festivals" className={`relative group header-link ${currentPath === '/festivals' ? 'text-dreamland' : ''}`}>Festivales<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === '/festivals' ? 'w-full' : ''}`}></span></Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a target="_blank" href="https://beacons.ai/gruposwhatsapperasmus" className="bg-dreamland text-black px-4 py-2 rounded-full font-semibold transition duration-300">WhatsApp 25/26</a>
          <Link to="/WhatsAppSection" className="border border-dreamland px-4 py-2 rounded-full whatsapp-button hover:text-black transition">WhatsApp 26/27</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden flex flex-col gap-1">
          <span className={`h-0.5 w-6 bg-white transition duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`h-0.5 w-6 bg-white transition duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`h-0.5 w-6 bg-white transition duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </div>

      <div className={`lg:hidden bg-neutral-800 backdrop-blur-md transition-all duration-500 overflow-hidden ${isOpen ? "max-h-screen py-6" : "max-h-0"}`}>
        <div className="flex flex-col items-center gap-6 text-lg font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className={`relative group header-link ${currentPath === "/" ? "text-dreamland" : ""}`}>Inicio<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === "/" ? "w-full" : ""}`}></span></Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className={`relative group header-link ${currentPath === "/about" ? "text-dreamland" : ""}`}>Sobre nosotros<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === "/about" ? "w-full" : ""}`}></span></Link>
          <Link to="/tickets" onClick={() => setIsOpen(false)} className={`relative group header-link ${currentPath === "/tickets" ? "text-dreamland" : ""}`}>Comprar entradas<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === "/tickets" ? "w-full" : ""}`}></span></Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)} className={`relative group header-link ${currentPath === "/photos" ? "text-dreamland" : ""}`}>Fotos<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === "/gallery" ? "w-full" : ""}`}></span></Link>
          <SocialDropdown currentPath={currentPath} />
          <Link to="/festivals" onClick={() => setIsOpen(false)} className={`relative group header-link ${currentPath === "/festivals" ? "text-dreamland" : ""}`}>Festivales<span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${currentPath === "/festivals" ? "w-full" : ""}`}></span></Link>

          <Link to="/WhatsAppSection" className="bg-dreamland text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300">WhatsApp 25/26</Link>
          <Link to="/WhatsAppSection" className="border border-dreamland px-4 py-2 rounded-full whatsapp-button hover:text-black transition">WhatsApp 26/27</Link>
        </div>
      </div>
    </header>
  );
}