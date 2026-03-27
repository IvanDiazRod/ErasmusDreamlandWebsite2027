import { useState, useEffect } from "react";
import { galleries } from "../../data/galleries";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Download, Images } from "lucide-react";

export default function Gallery() {

  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 768) {
        setColumns(3);
      } else {
        setColumns(1);
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (

    <section className="min-h-screen bg-gray-950 text-white py-20">  
      <div className="max-w-6xl mx-auto px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-dreamland mb-6 tracking-tight">Galería Erasmus Dreamland</h1>
        <p className="text-center text-gray-300 mb-16 text-lg">Revive los mejores momentos de nuestros festivales por toda Europa.</p>
        <div className="mb-12 text-center hidden md:block">
          <label className="block mb-4 text-yellow-400 font-semibold">Ajustar vista de galería: {columns} columnas</label>
          <input type="range" min="1" max="5" value={columns} onChange={(e) => setColumns(Number(e.target.value))} className="w-full max-w-md accent-yellow-400" />
        </div>

        <div className="grid gap-6 transition-all duration-500" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}> {galleries.slice().reverse().map((album) => (
          <div
  key={album.id}
  onClick={() => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
  }}
  className="relative group overflow-hidden rounded-2xl cursor-pointer transform transition duration-500 hover:scale-[1.03] hover:-translate-y-1 animate-fadeIn"
>
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-700"
                loading="lazy"
              />

              {/* Overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-end pb-6">
    <span className="text-dreamland text-lg font-semibold">
    Ver album
  </span>
  <span className="text-dreamland text-lg font-semibold">
    {album.title}
  </span>
  <span className="text-gray-300 text-sm">
    {album.images.length} imágenes
  </span>
</div>
            </div>
          ))}
        </div>

        {/* ALBUM VIEWER */}
        {selectedAlbum && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAlbum(null)}
          >
            <div
              className="flex flex-col gap-4 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-6 right-6 text-white text-2xl font-bold hover:text-dreamland transition z-50"
              >
                ✕
              </button>

              {/* Download buttons */}
<div className="absolute top-4 left-4 flex flex-col sm:flex-row gap-2 sm:gap-3 z-50 max-w-[90%]">

  {/* Descargar foto */}
  <a
    href={selectedAlbum.images[currentImageIndex]}
    download={`dreamland-${selectedAlbum.title}-${currentImageIndex + 1}.jpg`}
    className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium hover:bg-dreamland hover:text-black transition-all duration-300 shadow-lg whitespace-nowrap"
  >
    <Download size={14} className="sm:w-4 sm:h-4" />
    <span className="hidden xs:inline">Foto</span>
  </a>

  {/* Descargar álbum */}
  <button
    onClick={() => {
      selectedAlbum.images.forEach((img, index) => {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = img;
          link.download = `dreamland-${selectedAlbum.title}-${index + 1}.jpg`;
          link.click();
        }, index * 300);
      });
    }}
    className="flex items-center justify-center gap-2 bg-dreamland text-black px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-lg whitespace-nowrap"
  >
    <Images size={14} className="sm:w-4 sm:h-4" />
    <span className="hidden xs:inline">Álbum</span>
  </button>

</div>

              <div className="relative bg-black rounded-xl overflow-hidden">
                <img
                  src={selectedAlbum.images[currentImageIndex]}
                  alt={`${selectedAlbum.title} - ${currentImageIndex + 1}`}
                  className="w-full max-h-[500px] object-contain object-center rounded-xl"
                />

                {/* Navigation arrows */}
                {selectedAlbum.images.length > 1 && (
                  <>
                    <button onClick={() => setCurrentImageIndex((prev) => prev === 0 ? selectedAlbum.images.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-dreamland text-white w-12 h-12 rounded-full flex items-center justify-center transition">
  <ChevronLeft size={28} />
</button>

<button onClick={() => setCurrentImageIndex((prev) => prev === selectedAlbum.images.length - 1 ? 0 : prev + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-dreamland text-white w-12 h-12 rounded-full flex items-center justify-center transition">
  <ChevronRight size={28} />
</button>
                  </>
                )}
              </div>

              {/* Thumbnail gallery */}
<div className="flex gap-3 overflow-x-auto pb-3 px-1 scrollbar-thin scrollbar-thumb-neutral-700">

  {selectedAlbum.images.map((img, index) => {
    const isActive = index === currentImageIndex;

    return (
      <div key={index} className="relative flex-shrink-0">

        <img
          src={img}
          alt={`Thumbnail ${index + 1}`}
          onClick={() => setCurrentImageIndex(index)}
          className={`h-20 w-20 object-cover rounded-xl cursor-pointer transition-all duration-300 transform
            ${isActive
              ? "ring-2 ring-dreamland scale-105 brightness-110"
              : "opacity-60 hover:opacity-100 hover:scale-105"
            }`}
        />

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition rounded-xl flex items-center justify-center pointer-events-none">
          <span className="text-white text-xs">Ver</span>
        </div>

        {/* Botón descarga (mejorado) */}
        <a
          href={img}
          download={`dreamland-${selectedAlbum.title}-${index + 1}.jpg`}
          onClick={(e) => e.stopPropagation()}
          className="absolute -bottom-1 -right-1 bg-dreamland text-black text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-md hover:bg-yellow-500 transition"
        >
          ↓
        </a>

      </div>
    );
  })}

</div>

              <p className="text-center text-gray-300">
                {currentImageIndex + 1} de {selectedAlbum.images.length}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}