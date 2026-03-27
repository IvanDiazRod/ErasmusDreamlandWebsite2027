import React, { useEffect, useRef, useState } from "react";

export default function BuyTickets() {
  const loaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Evitar cargar múltiples veces
    if (loaded.current) return;
    loaded.current = true;

    // Limpiar el contenedor anterior
    const container = document.getElementById("fourvenues-iframe");
    if (container) {
      container.innerHTML = "";
    }

    // Recargar el script
    setIsLoading(true);
    const script = document.createElement("script");
    script.src =
      "https://www.fourvenues.com/assets/iframe/erasmus-dreamland/calendar@";
    script.async = true;
    
    script.onload = () => {
      setIsLoading(false);
    };
    
    script.onerror = () => {
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      // Limpiar cuando el componente se desmonta
      const container = document.getElementById("fourvenues-iframe");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

    const handleReload = () => {
    window.location.reload();
  };

  return (
    <section
      id="buy-tickets"
      className="iframe-container"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../public/hero/04.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "60px 0",
        textAlign: "center",
      }}
    >

      <h2 className="text-4xl font-bold text-dreamland mb-10">COMPRA TUS ENTRADAS</h2>

      {isLoading && (
        <div className="text-center mb-10">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-dreamland"></div>
            <p className="text-white mt-4">Cargando calendario...</p>
          </div>
        </div>
      )}

      <div id="fourvenues-iframe"></div>

       <div className="mt-8 text-white">
        <p className="mb-4 text-lg">
          ¿No ves el calendario de entradas?
        </p>
        <button
          onClick={handleReload}
          className="bg-dreamland text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition cursor-pointer"
        >
          Click aquí
        </button>
      </div>
      
    </section>
  );
}