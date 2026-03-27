import { useState, useEffect } from "react";

const images = [
  "/hero/01.jpg",
  "/hero/02.jpg",
  "/hero/03.jpg",
  "/hero/04.jpg",
  "/hero/05.jpg",
];

export default function Hero() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">{images.map((img, index) => (<div key={index} className={`absolute inset-0 bg-cover bg-center transition-all duration-4000 ease-linear ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} style={{ backgroundImage: `url(${img})` }} />))}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl px-6 animate-fadeUp">
          <img className="w-72 md:w-80 mx-auto mb-10" src="/LOGO_HD_sinfondo.png" alt="Erasmus Dreamland logo" />
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">El mayor festival Erasmus de Europa</h1>
          <p className="mt-6 text-lg md:text-xl text-dreamland tracking-wide">By Erasmus, for Erasmus.</p>
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#eventos" className="bg-dreamland text-black px-8 py-3 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300">Ver próximos eventos</a>
            <a href="#whatsapp" className="border border-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">Unirme al WhatsApp</a>
          </div>
        </div>
      </section>
  );
}