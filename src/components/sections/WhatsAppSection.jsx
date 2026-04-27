import { useState, useEffect } from "react";
import { whatsappGroups } from "../../data/WhatsappGroupsClean.jsx";
import { countryImages } from "../../data/CountryImages.jsx";
import { cityImages } from "../../data/cityImages.jsx";

export default function WhatsAppSection() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");

useEffect(() => {
  const timeoutId = setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, 10);

  return () => clearTimeout(timeoutId);
}, [selectedCountry, selectedState]);

  return (
    <section className="min-h-screen bg-gray-950 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-dreamland mb-6 leading-tight">Grupos WhatsApp Erasmus</h1>
        <h2 className="text-center text-gray-300 mb-16 text-lg">Únete al grupos de WhatsApp Erasmus de tu ciudad</h2>

        <div className="mb-8 text-sm text-gray-400">
          <span
            className="cursor-pointer hover:text-dreamland"
            onClick={() => {
              setSelectedCountry(null);
              setSelectedState(null);
              setCitySearchTerm("");
            }}
          >
            Países
          </span>

          {selectedCountry && (
            <>
              {" > "}
              <span
                className="cursor-pointer hover:text-dreamland"
                onClick={() => {
  setSelectedState(null);
}}
              >
                {selectedCountry.country}
              </span>
            </>
          )}

          {selectedState && (
            <>
              {" > "}
              <span className="text-dreamland">
                {selectedState.name}
              </span>
            </>
          )}
        </div>

        {/* Buscador */}
{!selectedCountry && (
  <div className="mb-10 max-w-xl mx-auto relative">
    <input
      type="text"
      placeholder="Buscar país..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-5 py-3 rounded-full bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:border-dreamland transition"
    />
  </div>
)}
{/* Buscador de ciudades */}
{selectedCountry && !selectedState && (
  <div className="mb-10 max-w-xl mx-auto relative">
    <input
      type="text"
      placeholder={`Buscar ciudad en ${selectedCountry.country}...`}
      value={citySearchTerm}
      onChange={(e) => setCitySearchTerm(e.target.value)}
      className="w-full px-5 py-3 rounded-full bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:border-dreamland transition"
    />
  </div>
)}

        {!selectedCountry && (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
    {whatsappGroups
  .filter((country) =>
    country.country
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .map((country) => (
      <div
        key={country.slug}
        onClick={() => {
  setSelectedCountry(country);
  setCitySearchTerm("");
}}
        className="relative h-64 rounded-2xl cursor-pointer overflow-hidden group"
      >
        {/* Imagen de fondo */}
        <img src={countryImages[country.slug] || "/countries/default.jpg"} alt={country.country} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition duration-500"></div>

        {/* Contenido */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <h2 className="text-2xl font-bold mb-2 text-white">
            {country.country}
          </h2>

          <p className="text-gray-200 text-sm">
            {country.states.length} ciudades
          </p>
        </div>
      </div>
    ))}
  </div>
)}

        {selectedCountry && !selectedState && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {selectedCountry.states
  .filter((state) =>
    state.name
      .toLowerCase()
      .includes(citySearchTerm.toLowerCase())
  )
  .map((state) => (
              <div
                key={state.slug}
                onClick={() => setSelectedState(state)}
                className="relative h-64 rounded-2xl cursor-pointer overflow-hidden group"
              >
                {/* Imagen de fondo */}
                <img
                  src={cityImages[state.slug] || "/cities/default.jpg"}
                  alt={state.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition duration-500"></div>

                {/* Contenido */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {state.name}
                  </h2>
                  <p className="text-gray-200 text-sm">
                    {state.groups.length} grupos
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedState && (
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">

            {selectedState.groups.length === 0 && (
              <p className="text-center text-gray-400">
                No hay grupos disponibles todavía.
              </p>
            )}

            {selectedState.groups.map((group, index) => (
              <a
                key={index}
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dreamland text-black px-6 py-4 rounded-xl font-semibold text-center hover:scale-105 hover:bg-yellow-500 transition"
              >
                {group.name}
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}