import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Esto mueve el scroll al inicio (coordenadas 0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Se ejecuta cada vez que el pathname cambia

  return null; // Este componente no renderiza nada visualmente
}