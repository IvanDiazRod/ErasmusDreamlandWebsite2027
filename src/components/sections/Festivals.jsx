import React, { useState, useRef, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function ArtistSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(-1);
  const [visibleImages, setVisibleImages] = useState(4);
  const touchStartX = useRef(null);

  const handlePrevClick = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prev) =>
      Math.min(images.length - visibleImages, prev + 1)
    );
  };

  const showLeftArrow = currentImageIndex > 0;
  const showRightArrow = currentImageIndex < images.length - visibleImages;

  const handleImageHover = (index) => {
    setHoveredImageIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredImageIndex(-1);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchCurrentX = event.touches[0].clientX;
    const touchDeltaX = touchCurrentX - touchStartX.current;

    if (touchDeltaX > 50) {
      handlePrevClick();
      touchStartX.current = touchCurrentX;
    } else if (touchDeltaX < -50) {
      handleNextClick();
      touchStartX.current = touchCurrentX;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      let vis = 4;
      if (window.innerWidth < 640) {
        vis = 1;
      } else if (window.innerWidth < 1024) {
        vis = 2;
      }
      setVisibleImages(vis);
      setCurrentImageIndex((idx) =>
        Math.min(idx, images.length - vis)
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images.length]);

  const containerStyle = {
    transform: `translateX(-${(currentImageIndex * 100) / visibleImages}%)`,
  };

  return (
    <div
      className="relative overflow-hidden w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {showLeftArrow && (
        <button
          onClick={handlePrevClick}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20
            w-12 h-12 flex items-center justify-center
            bg-black/40 backdrop-blur-md
            text-dreamland text-xl
            rounded-full
            hover:bg-dreamland hover:text-black
            transition-all duration-300
            shadow-lg cursor-pointer"
        >
          <MdChevronLeft className="w-6 h-6" />
        </button>
      )}
      <div
        className="flex gap-2 sm:gap-4 transition-transform duration-500 ease-out"
        style={containerStyle}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{ flex: `0 0 ${100 / visibleImages}%` }}
            className="flex-shrink-0"
          >
            <img
              src={image}
              alt={`Imagen ${index}`}
              className={`w-full rounded-lg transition-transform duration-200 opacity-0 animate-fadeUp delay-100 ${
                hoveredImageIndex === index ? "scale-105" : ""
              }`}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={handleImageLeave}
            />
          </div>
        ))}
      </div>
      {showRightArrow && (
        <button
          onClick={handleNextClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20
            w-12 h-12 flex items-center justify-center
            bg-black/40 backdrop-blur-md
            text-dreamland text-xl
            rounded-full
            hover:bg-dreamland hover:text-black
            transition-all duration-300
            shadow-lg cursor-pointer"
        >
          <MdChevronRight className="w-6 h-6" />
        </button>
      )}    </div>
  );
}

function FestivalSection({ title, description, moreDescription, images }) {
  return (
    <section className="w-full max-w-5xl space-y-6 bg-gray-900 bg-opacity-75 p-6 md:p-8 rounded-2xl shadow-2xl transition-transform transform hover:scale-105 animate-fadeUp">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center text-dreamland break-words">
        {title}
      </h2>
      <p className="text-center text-white leading-relaxed text-sm md:text-base">
        {description}
      </p>
      {moreDescription && (
        <p className="text-center text-white leading-relaxed text-sm md:text-base">
          {moreDescription}
        </p>
      )}
      <ArtistSlider images={images} />
    </section>
  );
}

export default function FestivalesComponent() {
const tbefImages = [
  "/festivals/1.jpg",
  "/festivals/2.jpg",
  "/festivals/3.jpg",
  "/festivals/4.jpg",
  "/festivals/5.jpg",
  "/festivals/6.jpg",
  "/festivals/7.jpg", 
  "/festivals/8.jpg"
];  const zakopaneImages = [
  "/festivals/9.jpg",
      "/festivals/13.jpg",
  "/festivals/10.jpg",
  "/festivals/11.jpg",
  "/festivals/12.jpg",

];

const halloweenImages = [
  "/festivals/14.jpg",
      "/festivals/15.jpg",
  "/festivals/16.jpg",
  "/festivals/17.jpg",
  "/festivals/18.jpg",
  "/festivals/19.jpg",
];

const croaciaImages = [
  "/festivals/20.jpg",
      "/festivals/21.jpg",
  "/festivals/22.jpg",
  "/festivals/23.jpg",
  "/festivals/24.jpg",
  
];

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-16 space-y-16 bg-gradient-to-b from-black via-gray-800 to-black">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dreamland uppercase tracking-wide mb-8">
        NUESTROS FESTIVALES
      </h1>

      <section className="max-w-3xl px-4 text-center space-y-6 animate-fadeUp">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white break-words">
          THE BIGGEST ERASMUS FESTIVAL
        </h2>
        <p className="text-white leading-relaxed">
          THE BIGGEST ERASMUS FESTIVAL es mucho más que un evento: es una marca que representa el espíritu Erasmus
          en su forma más auténtica. Nació con la misión de conectar a miles de estudiantes internacionales
          en torno a la música, la cultura y la celebración, creando experiencias inolvidables en lugares únicos.
        </p>
        <p className="text-white leading-relaxed">
          Bajo este sello se organizan los festivales Erasmus más grandes de Europa, con una organización profesional que
          entiende desde dentro lo que busca la comunidad Erasmus. Cada festival garantiza calidad, ambiente internacional,
          artistas top y una energía que solo puede vivirse entre los Erasmus que comparten la misma pasión.
        </p>
      </section>

      <FestivalSection
        title="THE BIGGEST ERASMUS FESTIVAL - BRATISLAVA"
        description="Este octubre celebramos la quinta edición en Bratislava, un evento que nació como un sueño: reunir a todos los Erasmus de Europa durante un fin de semana inolvidable. Con DJs y artistas top del panorama nacional, Bratislava vibra cada Octubre con el espíritu Erasmus."
        images={tbefImages}
      />

      <FestivalSection
        title="THE BIGGEST ERASMUS HALLOWEEN FESTIVAL - CRACOVIA"
        description="Nuestro festival de Halloween es siempre una de las fechas más señaladas del curso. Cada noche de Halloween, Cracovia acoge a más de 2.000 Erasmus de toda Europa para celebrar esta terrorífica noche."
        images={halloweenImages}
      />

      <FestivalSection
        title="ERASMUS SNOW FESTIVAL - ZAKOPANE"
        description="Erasmus Snow Festival es un evento único que reúne a estudiantes Erasmus de toda Europa en un fin de semana inolvidable en Zakopane, un pintoresco pueblo de montaña en el sur de Polonia, conocido como la capital invernal del país."
        moreDescription="En su primera edición, más de 1.000 estudiantes Erasmus se reunieron durante este increíble fin de semana para esquiar, relajarse en los balnearios, y salir de fiesta hasta el amanecer."
        images={zakopaneImages}
      />

      <FestivalSection
        title="ERASMUS BEACH FESTIVAL - ZRCÉ BEACH"
        description="El Erasmus Beach Festival celebró su primera edición por todo lo alto en la icónica Zrće Beach, Croacia, convirtiéndose en el evento de cierre del curso más esperado por estudiantes de toda Europa. Más de 5.000 Erasmus se dieron cita en este paraíso del Adriático para vivir una experiencia única de música, sol y fiesta sin límites. Durante 3 días, las playas de Novalja se transformaron en el punto de encuentro de jóvenes de decenas de nacionalidades unidos por el mismo espíritu: despedir el mejor año de la vida con la mejor energía."
        moreDescription="La primera edición contó con un cartel de artistas que no dejó indiferente a nadie. Garabatto, Michenlo, Selecta y Barce fueron algunos de los DJs que hicieron vibrar los escenarios frente al mar con sets cargados de electrónica, reggaetón y los hits más sonados del momento. El Erasmus Beach Festival no solo fue una fiesta, sino una celebración de la diversidad, la amistad y los recuerdos compartidos que marcan un antes y un después en la experiencia Erasmus."
        images={croaciaImages}
      />

    </div>
  );
}
