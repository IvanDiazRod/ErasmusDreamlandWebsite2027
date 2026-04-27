import React, { useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Marker } from "react-simple-maps";
import { useState, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SPAIN_REGIONS_URL = "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/spain-communities.geojson";

const spainData = { name: "España", salas: ["Barcelona: Hype Barcelona", "Madrid: Juanita 2.0", "Granada: Granada 10", "Las Palmas GC: Chester Las Palmas", "SC Tenerife: Gekko", "Valencia: Indiana"] };

export const countryData = {
  "040": { name: "Austria", salas: ["Viena: Cellavie Aviation Club"] },
  "056": { name: "Bélgica", salas: ["Bruselas: Dyoukes", "Gante: Luxx Overpoort"] },
  "100": { name: "Bulgaria", salas: ["Sofía: Club Oblk"] },
  "191": { name: "Croacia", salas: ["Zagreb: Depo Klub", "Zrce Beach: Kalypso"] },
  "196": { name: "Chipre", salas: ["Muy pronto!"] },
  "203": { name: "Rep. Checa", salas: ["Praga: Duplex", "Praga: Sasazu", "Brno: 7.Nebe", "Brno: Maison Club & Lounge"] },
  "208": { name: "Dinamarca", salas: ["Copenhague: Mirror"] },
  "233": { name: "Estonia", salas: ["Muy pronto!"] },
  "246": { name: "Finlandia", salas: ["Milliklubi"] },
  "250": { name: "Francia", salas: ["París: La Java", "Lyon: Loft Club", "Lille: Taberna Latina"] },
  "276": { name: "Alemania", salas: ["Berlín: Matrix", "Múnich: Mint Club"] },
  "300": { name: "Grecia", salas: ["Atenas: Gazi View"] },
  "348": { name: "Hungría", salas: ["Budapest: Dürer Kert"] },
  "372": { name: "Irlanda", salas: ["Dublín: The Button Factory"] },
  "380": { name: "Italia", salas: ["Bari: Demodé Club", "Bolonia: Boma Club", "Cagliari: Illusion Club", "Florencia: Tenax Club", "Foggia: Alternative Club", "Génova: Casa Mia Club", "Milán: Play Club", "Nápoles: Basic Club", "Pádua: Utopia Society Club", "Palermo: Malaluna Club", "Parma: Discoteca Sottosopra", "Roma: Soap House", "Turín: Contrada Murazzi"] },
  "428": { name: "Letonia", salas: ["Muy pronto!"] },
  "440": { name: "Lituania", salas: ["Vilna: Salento", "Kaunas: Taboo Club"] },
  "442": { name: "Luxemburgo", salas: ["Muy pronto!"] },
  "470": { name: "Malta", salas: ["Muy pronto!"] },
  "528": { name: "Países Bajos", salas: ["Ámsterdam: Panama", "Eindhoven: Club XI", "Groningen: Pitchets", "Róterdam: Reverse"] },
  "578": { name: "Noruega", salas: ["Bergen: Bryggen Nightclub", "Oslo: KJ10 Club"] },
  "616": { name: "Polonia", salas: ["Varsovia: Labirynt Club", "Cracovia: Hype Park", "Bialystok: Balance Klub", "Gdansk: Bunkier Music Club", "Katowice: Pomerancza Club", "Lodz: Larum Lodz", "Lublin: Paradox Club", "Poznan: Czarna Owca", "Wroclaw: Beyound Music Club"] },
  "620": { name: "Portugal", salas: ["Coimbra: Sala 8", "Lisboa: Lisboa Ao Vivo", "Oporto: Hard Club"] },
  "642": { name: "Rumanía", salas: ["Bucarest: El Dictador", "Cluj-Napoca: Flying Circus"] },
  "703": { name: "Eslovaquia", salas: ["Bratislava: Klub 39", "Bratislava: The Club ", "Bratislava: Channels", "Bratislava: Great"] },
  "705": { name: "Eslovenia", salas: ["Liubliana: Publika Klub", "Maribor: M Club"] }, 
  "752": { name: "Suecia", salas: ["Muy pronto!"] },
  "724":{ name: "España", salas: ["Barcelona: Hype Barcelona", "Madrid: Juanita 2.0", "Granada: Granada 10", "Las Palmas GC: Chester Las Palmas", "SC Tenerife: Gekko", "Valencia: Indiana"] },
  "826": { name: "Reino Unido", salas: ["Muy pronto!"] },
  "792": { name: "Turquía", salas: ["Estambul: Back Street"] },
};

export default function Map() {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

const europeanCountries = new Set([
  "040", // Austria
  "056", // Belgium
  "250", // France
  "276", // Germany
  "372", // Ireland
  "380", // Italy
  "442", // Luxembourg
  "528", // Netherlands
  "620", // Portugal
  "724", // Spain
  "208", // Denmark
  "233", // Estonia
  "246", // Finland
  "352", // Iceland
  "428", // Latvia
  "440", // Lithuania
  "578", // Norway
  "752", // Sweden
  "826", // United Kingdom
  "203", // Czechia
  "348", // Hungary
  "616", // Poland
  "703", // Slovakia
  "705", // Slovenia
  "756", // Switzerland
  "276", // Germany (again sometimes appears in datasets)
  "300", // Greece
  "191", // Croatia
  "470", // Malta
  "196", // Cyprus
  "008", // Albania
  "020", // Andorra
  "070", // Bosnia and Herzegovina
  "499", // Montenegro
  "688", // Serbia
  "807", // North Macedonia
  "100", // Bulgaria
  "112", // Belarus
  "498", // Moldova
  "642", // Romania
  "051", // Armenia
  "031", // Azerbaijan
  "268", // Georgia
  "438", // Liechtenstein
  "492", // Monaco
  "674", // San Marino
  "336",  // Vatican City
  "383", // Kosovo
]);

const events = [
  { id: 1, country: "Países Bajos", city: "Amsterdam", venue: "Panama", name: "Amsterdam Erasmus Party", coordinates: [4.9041, 52.3676] },
  { id: 2, country: "Grecia", city: "Atenas", venue: "Gazi View", name: "Athens Erasmus Party", coordinates: [23.7275, 37.9838] },
  { id: 3, country: "España", city: "Barcelona", venue: "Hype Barcelona", name: "Barcelona Erasmus Party", coordinates: [2.1734, 41.3851] },
  { id: 4, country: "Italia", city: "Bari", venue: "Demodé Club", name: "Bari Erasmus Party", coordinates: [16.8719, 41.1171] },
  { id: 5, country: "Eslovaquia", city: "Bratislava", venue: "Klub 39 / The Club / Channels", name: "Bratislava Erasmus Party", coordinates: [17.1077, 48.1486] },
  { id: 6, country: "Rep. Checa", city: "Praga", venue: "Duplex / Sasazu", name: "Prague Erasmus Party", coordinates: [14.4378, 50.0755] },
  { id: 7, country: "Alemania", city: "Berlín", venue: "Matrix", name: "Berlin Erasmus Party", coordinates: [13.405, 52.52] },
  { id: 8, country: "Hungría", city: "Budapest", venue: "Dürer Kert", name: "Budapest Erasmus Party", coordinates: [19.0402, 47.4979] },
  { id: 9, country: "Francia", city: "París", venue: "La Java", name: "Paris Erasmus Party", coordinates: [2.3522, 48.8566] },
  { id: 10, country: "Italia", city: "Roma", venue: "Soap House", name: "Rome Erasmus Party", coordinates: [12.4964, 41.9028] },
  { id: 11, country: "España", city: "Madrid", venue: "Juanita 2.0", name: "Madrid Erasmus Party", coordinates: [-3.7038, 40.4168] },
  { id: 12, country: "Portugal", city: "Lisboa", venue: "Lisboa Ao Vivo", name: "Lisbon Erasmus Party", coordinates: [-9.1393, 38.7223] },
  { id: 13, country: "Polonia", city: "Varsovia", venue: "Labirynt Club", name: "Warsaw Erasmus Party", coordinates: [21.0122, 52.2297] },
  { id: 14, country: "Austria", city: "Viena", venue: "Cellavie Aviation Club", name: "Vienna Erasmus Party", coordinates: [16.3738, 48.2082] },
  { id: 15, country: "Croacia", city: "Zagreb", venue: "Depo Klub", name: "Zagreb Erasmus Party", coordinates: [15.9819, 45.815] },
  { id: 16, country: "Noruega", city: "Bergen", venue: "Bryggen Nightclub", name: "Bergen Erasmus Party", coordinates: [5.3221, 60.3913] },
  { id: 17, country: "Polonia", city: "Cracovia", venue: "Hype Park", name: "Krakow Erasmus Party", coordinates: [19.945, 50.0647] },
  { id: 18, country: "Rumanía", city: "Bucarest", venue: "El Dictador", name: "Bucharest Erasmus Party", coordinates: [26.1025, 44.4323] },
  { id: 19, country: "Bélgica", city: "Bruselas", venue: "Dyoukes", name: "Brussels Erasmus Party", coordinates: [4.3517, 50.8503] },
  { id: 20, country: "Turquía", city: "Estambul", venue: "Back Street", name: "Istanbul Erasmus Party", coordinates: [28.9784, 41.0082] },
  { id: 21, country: "Lituania", city: "Vilna", venue: "Salento", name: "Vilnius Erasmus Party", coordinates: [25.2797, 54.6872] },
  { id: 22, country: "España", city: "Valencia", venue: "Indiana", name: "Valencia Erasmus Party", coordinates: [-0.3763, 39.4699] },
  { id: 23, country: "España", city: "Granada", venue: "Granada 10", name: "Granada Erasmus Party", coordinates: [-3.5986, 37.1773] },
  { id: 24, country: "España", city: "Las Palmas GC", venue: "Chester Las Palmas", name: "Las Palmas Erasmus Party", coordinates: [-15.4134, 28.1248] },
  { id: 25, country: "España", city: "SC Tenerife", venue: "Gekko", name: "Tenerife Erasmus Party", coordinates: [-16.2472, 28.4636] },
  { id: 26, country: "Italia", city: "Milán", venue: "Play Club", name: "Milan Erasmus Party", coordinates: [9.19, 45.4642] },
  { id: 27, country: "Italia", city: "Florencia", venue: "Tenax Club", name: "Florence Erasmus Party", coordinates: [11.2558, 43.7696] },
  { id: 28, country: "Eslovenia", city: "Liubliana", venue: "Publika Klub", name: "Ljubljana Erasmus Party", coordinates: [14.5058, 46.0569] },
  { id: 29, country: "Dinamarca", city: "Copenhague", venue: "Mirror", name: "Copenhagen Erasmus Party", coordinates: [12.5683, 55.6761] },
  { id: 30, country: "Bulgaria", city: "Sofía", venue: "Club Oblk", name: "Sofia Erasmus Party", coordinates: [23.3219, 42.6977] },
  { id: 31, country: "Polonia", city: "Bialystok", venue: "Balance Klub", name: "Bialystok Erasmus Party", coordinates: [23.1688, 53.1325] },
  { id: 32, country: "Italia", city: "Bolonia", venue: "Boma Club", name: "Bologna Erasmus Party", coordinates: [11.3426, 44.4949] },
  { id: 33, country: "Rep. Checa", city: "Brno", venue: "7.Nebe / Maison", name: "Brno Erasmus Party", coordinates: [16.6068, 49.1951] },
  { id: 34, country: "Rumanía", city: "Cluj-Napoca", venue: "Flying Circus", name: "Cluj Erasmus Party", coordinates: [23.5916, 46.7712] },
  { id: 35, country: "Portugal", city: "Coimbra", venue: "Sala 8", name: "Coimbra Erasmus Party", coordinates: [-8.4103, 40.2033] },
  { id: 36, country: "Países Bajos", city: "Eindhoven", venue: "Club XI", name: "Eindhoven Erasmus Party", coordinates: [5.4777, 51.4416] },
  { id: 37, country: "Polonia", city: "Gdansk", venue: "Bunkier Music Club", name: "Gdansk Erasmus Party", coordinates: [18.6466, 54.352] },
  { id: 38, country: "Países Bajos", city: "Groningen", venue: "Pitchets", name: "Groningen Erasmus Party", coordinates: [6.5665, 53.2192] },
  { id: 39, country: "Polonia", city: "Katowice", venue: "Pomerancza Club", name: "Katowice Erasmus Party", coordinates: [19.0238, 50.2649] },
  { id: 40, country: "Lituania", city: "Kaunas", venue: "Taboo Club", name: "Kaunas Erasmus Party", coordinates: [23.9033, 54.8985] },
  { id: 41, country: "Francia", city: "Lyon", venue: "Loft Club", name: "Lyon Erasmus Party", coordinates: [4.8357, 45.764] },
  { id: 42, country: "Portugal", city: "Oporto", venue: "Hard Club", name: "Porto Erasmus Party", coordinates: [-8.6110, 41.1455] },
  { id: 43, country: "Países Bajos", city: "Róterdam", venue: "Reverse", name: "Rotterdam Erasmus Party", coordinates: [4.4777, 51.9225] },
  { id: 44, country: "Polonia", city: "Wroclaw", venue: "Beyound Music Club", name: "Wroclaw Erasmus Party", coordinates: [17.0385, 51.1079] },
  { id: 45, country: "Croacia", city: "Zrce Beach", venue: "Kalypso", name: "Zrce Erasmus Party", coordinates: [14.9141, 44.5393] }
];

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true
    });
  }, []);

  const markers = useMemo(() => {
  return events.map((event) => (
    <Marker
      key={event.id}
      coordinates={event.coordinates}
      onClick={() => setSelectedEvent(event)}
    >
      <circle
        r={6}
        fill="#FACC15"
        stroke="#000"
        strokeWidth={1}
        style={{ cursor: "pointer" }}
      />
    </Marker>
  ));
}, [events]);

const [center, setCenter] = useState([10, 50]);

useEffect(() => {
  if (selectedEvent) {
    setCenter(selectedEvent.coordinates);
  }
}, [selectedEvent]);

  return (
    <section className="py-24 bg-neutral-900 hidden md:block">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-dreamland mb-8">¿Donde hemos estado?</h2>
      <p className="text-3xl md:text-2xl text-center text-white mb-8">En nuestro primer año de vida, hemos estado en más de 20 países europeos. ¿Puedes encontrar dónde?</p>

      <div className="relative" onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
        <ComposableMap projection="geoMercator" projectionConfig={{scale: 500, center: [10, 52],}} width={1800} height={600} style={{ width: "100%", height: "auto" }}>
          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }) => geographies.filter((geo) => europeanCountries.has(geo.id)).map((geo) => {const data = countryData[geo.id]; return (<Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" onMouseEnter={() => setHoveredCountry(data)} onMouseLeave={() => setHoveredCountry(null)} style={{default: { outline: "none" }, hover: {outline: "none", fill: "#FFE066", cursor: "pointer"}, pressed: { outline: "none" },}} />);})}
          </Geographies>
          <Geographies geography={SPAIN_REGIONS_URL}>
  {({ geographies }) =>
    geographies
      .filter((geo) =>
        ["Canarias", "Islas Baleares"].includes(geo.properties.name)
      )
      .map((geo) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          fill="#EAEAEC"
          stroke="#D6D6DA"
          onMouseEnter={() => setHoveredCountry(spainData)}
          onMouseLeave={() => setHoveredCountry(null)}
          style={{
            default: { outline: "none" },
            hover: { outline: "none", fill: "#FFE066", cursor: "pointer" },
            pressed: { outline: "none" },
          }}
        />
      ))
  }
</Geographies>
          {events.map((event) => (<Marker key={event.id} coordinates={event.coordinates} onClick={() => setSelectedEvent(event)}><circle r={6} fill="#FACC15" stroke="#000" strokeWidth={1} style={{ cursor: "pointer" }} /></Marker>))}
        </ComposableMap>

        {hoveredCountry && (
          <div style={{position: 'fixed', left: mousePos.x + 10 + 'px', top: mousePos.y + 10 + 'px', backgroundColor: '#FDE047', color: 'black', padding: '20px', borderRadius: '8px', maxWidth: '600px', zIndex: 1000, pointerEvents: 'none'}}>
            <h3 style={{fontWeight: 'bold', marginBottom: '5px'}}>{hoveredCountry.name}</h3>
            <div style={{ margin: '5px 0' }}>{hoveredCountry.salas.map((sala, index) => (<li className="list-disc" key={index} style={{ margin: '2px 0' }}>{sala}</li>))}</div>
          </div>
        )}

      </div>

      {selectedEvent && (
        <div className="mt-6 text-center bg-neutral-800 p-4 rounded-lg max-w-md mx-auto">
          
          <h3 className="text-xl font-bold text-white">{selectedEvent.city} - {selectedEvent.country}</h3>
          <p className="text-white">{selectedEvent.venue}</p>
          <p className="text-sm text-white">{selectedEvent.date}</p>
        </div>
      )}

    </section>
  );
}