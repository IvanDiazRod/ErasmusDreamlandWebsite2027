import { useState } from "react";
import { whatsappGroups } from "../../data/WhatsappGroups";

export default function WhatsAppSection() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  return (
    <section className="min-h-screen bg-gray-950 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-dreamland mb-6 leading-tight">
  Grupos de WhatsApp
</h1>

        <p className="text-center text-gray-300 mb-16 text-lg">
          Encuentra tu ciudad y únete a la comunidad Erasmus
        </p>

        {/* BREADCRUMB */}
        <div className="mb-8 text-sm text-gray-400">
          <span
            className="cursor-pointer hover:text-dreamland"
            onClick={() => {
              setSelectedCountry(null);
              setSelectedState(null);
            }}
          >
            Países
          </span>

          {selectedCountry && (
            <>
              {" > "}
              <span
                className="cursor-pointer hover:text-dreamland"
                onClick={() => setSelectedState(null)}
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

        {!selectedCountry && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {whatsappGroups.map((country) => (
              <div
                key={country.slug}
                onClick={() => setSelectedCountry(country)}
                className="p-6 bg-neutral-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-neutral-700 transition"
              >
                <h2 className="text-xl font-bold mb-2">
                  {country.country}
                </h2>

                <p className="text-gray-400 text-sm">
                  {country.states.length} ciudades
                </p>
              </div>
            ))}
          </div>
        )}

        {selectedCountry && !selectedState && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {selectedCountry.states.map((state) => (
              <div
                key={state.slug}
                onClick={() => setSelectedState(state)}
                className="p-6 bg-neutral-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-neutral-700 transition"
              >
                <h2 className="text-lg font-semibold">
                  {state.name}
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  {state.groups.length} grupos
                </p>
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