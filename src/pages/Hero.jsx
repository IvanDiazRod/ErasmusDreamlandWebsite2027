import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {

  const heroImages = [
    "/img/destinos.jpg",
    "/img/Yucatan.jpg",
    "/img/HaGiangLoop.jpg",
    "/img/calapi.jpg",
  ];
  
  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center min-h-[85vh] w-full px-8 md:px-20 overflow-hidden">
      {heroImages.map((img, index) => (<div key={img} className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-110"}`} style={{ backgroundImage: `url(${img})` }} />))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
      <div className="relative z-10 flex flex-col gap-6 max-w-xl text-white">
        <h2 className="text-4xl md:text-6xl font-semibold leading-tight">Discover your <br /> perfect tour</h2>
        <p className="text-lg md:text-xl">Explore the world with us and live unforgettable experiences.</p>
        <Link to="/tours" className="bg-blue-700 hover:bg-blue-800 transition-all text-white text-lg md:text-xl px-8 py-4 rounded-2xl w-fit cursor-pointer hover:scale-105">Find tours</Link>
      </div>
    </section>
  );
}