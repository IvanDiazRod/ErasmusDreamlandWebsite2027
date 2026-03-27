import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube } from 'react-icons/fa';
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (

    <footer className="bg-neutral-950 text-gray-400 py-4">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          <div>
            <h2 className="text-xl font-bold text-dreamland mb-4">Erasmus Dreamland</h2>
            <p className="text-xs leading-relaxed">Erasmus Dreamland SLU</p>
            <p className="text-xs leading-relaxed">C/ Pablo Picasso 3, 2D, 35411, Arucas, Las Palmas, España</p>
            <p className="text-xs leading-relaxed">info@erasmusdreamland.com</p>
            <p className="text-xs leading-relaxed">+34 633342808</p>
          </div>

          <div>
            <h3 className="text-dreamland font-semibold mb-4 text-sm">Explorar</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="http://localhost:5173/#artists" className="footer-link">Artistas</a></li>
              <li><Link to="/gallery" className="footer-link">Galería</Link></li>
              <li><Link to="/tickets" className="footer-link">Entradas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-dreamland font-semibold mb-4 text-sm">Síguenos</h3>
            <div className="flex space-x-6 text-lg">
              <a target="_blank" href="https://instagram.com/erasmusdreamland" className="footer-link"><FaInstagram /></a>
              <a target="_blank" href="https://tiktok.com/@erasmusdreamland" className="footer-link"><FaTiktok /></a>
              <a target="_blank" href="https://www.youtube.com/@erasmusdreamland" className="footer-link"><FaYoutube /></a>
            </div>

            <div className="mt-3">
              <h4 className="text-sm text-dreamland font-semibold mb-1">Contacto</h4>
              <p className="text-xs"><a href="mailto:info@erasmusdreamland.com" className="footer-link">info@erasmusdreamland.com</a></p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-3 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} Erasmus Dreamland. Todos los derechos reservados.</p>
          <a href="/privacy-policy" className="text-dreamland transition mt-4 md:mt-0">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}