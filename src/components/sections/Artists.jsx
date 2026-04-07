import React from "react";
import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function ArtistCard({ artist, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`
        relative group rounded-xl overflow-hidden shadow-lg
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <img
        src={artist.img}
        alt={artist.name}
        className="w-full h-100 object-cover"
      />

      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center p-6
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500">

        <h3 className="text-2xl font-bold mb-2">
          {artist.name}
        </h3>

        <p className="text-dreamland mb-4">
          {artist.description}
        </p>

        <a
          href={artist.social}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-full font-semibold instagram-btn"
        >
          Instagram
        </a>
      </div>
    </div>
  );
}

const artistsData = [
  {
    name: "Omar Montes",
    description: "Artista Número 1 de España, con más de 10 canciones en el top 50, se una a nuestra familia erasmus tras realizar su gira por europa con nosotros.",
    img: "/artists/omarmontes.png",
    social: "https://instagram.com/djstellar"
  },
  {
    name: "Kiko Rivera",
    description: "Creador del hit mundial 'El Mambo' y conocido por todas las generaciones de Españoles, se une a la familia Erasmus.",
    img: "/artists/kiko.png",
    social: "https://instagram.com/djstellar"
  },
  {
    name: "Selecta",
    description: "El niño, productor de artistas como Recycled J, Duki, Neo Pistea, Don Patricio, Bejo, ATICA o Israel B, entre otros, Selecta se consolida como uno de los productores clave en el panorama musical español con un estilo propio imposible de encasillar.",
    img: "/artists/selecta.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Papi Gavi",
    description: "Uno de los creadores de contenido más conocido y querido por el público español, da su salto a los escenarios llevando a Europa el mejor reggaeton.",
    img: "/artists/gavi.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Alvama Ice",
    description: "El madrileño se dio a conocer tras subir sus sesiones a las redes sociales durante el confinamiento, alcanzando el millón de seguidores en TikTok y siendo conocido desde entonces por sus propios remixes y mashups, con ritmos de hip hop, trap o reggaeton.",
    img: "/artists/alvama.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Henry Mendez",
    description: "Directo desde España y RD, y con sus temas 'Rayos de sol', 'Mi reina', o 'El tiburón', Hnery Mendez llega a Europa para asegurarse que tu noche Erasmus sea inolvidable.",
    img: "/artists/henrymendez.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Carmen de la Fuente",
    description: "Con más de 200K seguidores en redes, Carmen de la Fuente se ha proclamado la DJ con más impacto del panorama español.",
    img: "/artists/carmen.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Alex Martini",
    description: "DJ y productor musical español conocido por sus mashups y su éxito 'Dime Bebesita', que acumula más de 38 millones de reproducciones. DJ residente en Shoko Madrid, con más de 500.000 seguidores en las redes sociales.",
    img: "/artists/martini.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Aissa",
    description: "Con su mayor éxito, 'Las Bratz', Aissa es una cantante marroquí que está a punto de alcanzar la cima del género urbano.",
    img: "/artists/aissa.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Barce",
    description: "Con sólo 24 años, es uno de los DJ más solicitados de España. El autodenominado 'Pájaro' está listo para volar con nosotros por toda Europa.",
    img: "/artists/barce.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Jorge Cremades",
    description: "Con más de 3M de seguidores en las redes sociales, Jorge Cremades es un conocido Instagramer, que ahora ha dado el salto a su carrera como DJ. Pura energía y diversión",
    img: "/artists/cremades.png",
    social: "https://instagram.com/djstellar"
  },
    {
    name: "Vybs",
    description: "With more than 400k followers on TikTok thanks to his absolutely macabre humour videos, Vybs presents his new facet as a DJ, so that all future Erasmus students can dance to the rhythm of his madness.",
    img: "/artists/vybs.png",
    social: "https://instagram.com/djstellar"
  },
];

export default function Artists() {
  
  const [showAll, setShowAll] = useState(false);

  const visibleArtists = showAll ? artistsData : artistsData.slice(0, 6);
  return (
    <section id="artists" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Nuestros Artistas</h2>
        <p className="text-3xl md:text-2xl mb-12 text-dreamland">Conoce a los DJ's que te van a hacer bailar durante el mejor año de tu vida.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
  {visibleArtists.map((artist, index) => (
    <ArtistCard
      key={artist.name}
      artist={artist}
      index={index}
    />
  ))}
        </div>
        {artistsData.length > 6 && (
  <div className="mt-12">
    <button
      onClick={() => setShowAll(!showAll)}
      className="px-8 py-3 bg-dreamland text-black font-semibold rounded-full
                  transition-all duration-300 cursor-pointer"
    >
      {showAll ? "Ver menos" : "Ver más artistas"}
    </button>
  </div>
)}
      </div>
    </section>
  );
}