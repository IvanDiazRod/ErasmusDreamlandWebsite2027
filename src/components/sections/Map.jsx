import React, { useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Marker } from "react-simple-maps";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const countryData = {
  "040": { name: "Austria", salas: ["Vienna Club", "Salzburg Venue"], eventos: ["Erasmus Party 2026", "Snow Festival"] },
  "056": { name: "Belgium", salas: ["Brussels Hall", "Antwerp Club"], eventos: ["Beer Fest", "City Tour Party"] },
  "100": { name: "Bulgaria", salas: ["Sofia Arena", "Plovdiv Club"], eventos: ["Black Sea Party", "Mountain Fest"] },
  "191": { name: "Croatia", salas: ["Zagreb Club", "Dubrovnik Venue"], eventos: ["Adriatic Party", "Island Hop"] },
  "196": { name: "Cyprus", salas: ["Nicosia Hall", "Limassol Club"], eventos: ["Mediterranean Fest", "Beach Party"] },
  "203": { name: "Czechia", salas: ["Prague Castle", "Brno Venue"], eventos: ["Beer Tour", "Castle Party"] },
  "208": { name: "Denmark", salas: ["Copenhagen Hall", "Aarhus Club"], eventos: ["Viking Fest", "Nordic Party"] },
  "233": { name: "Estonia", salas: ["Tallinn Club", "Tartu Venue"], eventos: ["Baltic Fest", "Tech Party"] },
  "246": { name: "Finland", salas: ["Helsinki Arena", "Turku Club"], eventos: ["Sauna Party", "Northern Lights"] },
  "250": { name: "France", salas: ["Paris Eiffel", "Lyon Venue"], eventos: ["Bastille Day", "Wine Tour"] },
  "276": { name: "Germany", salas: ["Berlin Club", "Munich Hall"], eventos: ["Oktoberfest", "Berlin Wall Party"] },
  "300": { name: "Greece", salas: ["Athens Acropolis", "Thessaloniki Club"], eventos: ["Olympic Fest", "Island Party"] },
  "348": { name: "Hungary", salas: ["Budapest Baths", "Debrecen Venue"], eventos: ["Thermal Party", "Danube Fest"] },
  "372": { name: "Ireland", salas: ["Dublin Pub", "Galway Club"], eventos: ["Guinness Fest", "Leprechaun Party"] },
  "380": { name: "Italy", salas: ["Rome Colosseum", "Milan Duomo"], eventos: ["Pizza Party", "Vatican Tour"] },
  "428": { name: "Latvia", salas: ["Riga Castle", "Jurmala Beach"], eventos: ["Baltic Sea", "Medieval Fest"] },
  "440": { name: "Lithuania", salas: ["Vilnius Old Town", "Kaunas Club"], eventos: ["Amber Fest", "Forest Party"] },
  "442": { name: "Luxembourg", salas: ["Luxembourg City", "Clervaux Venue"], eventos: ["Castle Tour", "Wine Fest"] },
  "470": { name: "Malta", salas: ["Valletta Harbor", "Gozo Club"], eventos: ["Mediterranean Dive", "Knight Fest"] },
  "528": { name: "Netherlands", salas: ["Amsterdam Canal", "Rotterdam Port"], eventos: ["Tulip Fest", "Bike Party"] },
  "616": { name: "Poland", salas: ["Warsaw Square", "Krakow Castle"], eventos: ["Pierogi Party", "Wawel Fest"] },
  "620": { name: "Portugal", salas: ["Lisbon Alfama", "Porto Douro"], eventos: ["Fado Night", "Wine Tour"] },
  "642": { name: "Romania", salas: ["Bucharest Palace", "Transylvania Club"], eventos: ["Dracula Fest", "Carpathian Party"] },
  "703": { name: "Slovakia", salas: ["Bratislava Castle", "Kosice Venue"], eventos: ["Tatras Fest", "Slavic Party"] },
  "705": { name: "Slovenia", salas: ["Ljubljana Lake", "Bled Club"], eventos: ["Alpine Party", "Lake Fest"] },
  "724": { name: "Spain", salas: ["Madrid Plaza", "Barcelona Beach"], eventos: ["Flamenco Night", "Paella Party"] },
  "752": { name: "Sweden", salas: ["Stockholm Palace", "Gothenburg Club"], eventos: ["ABBA Fest", "Midnight Sun"] },
  "826": { name: "United Kingdom", salas: ["London Tower", "Edinburgh Castle"], eventos: ["Tea Party", "Royal Fest"] },
  "383": { name: "Kosovo", salas: ["Pristina Arena", "Mitrovica Club"], eventos: ["Balkan Fest", "Kosovo Party"] },
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
  {
    id: 1,
    country: "Spain",
    city: "Madrid",
    venue: "Madrid Arena",
    name: "Dreamland Opening Party",
    date: "2026-06-12",
    coordinates: [-3.7038, 40.4168]
  },
  {
    id: 2,
    country: "Germany",
    city: "Berlin",
    venue: "Berlin Club",
    name: "Techno Erasmus Night",
    date: "2026-07-03",
    coordinates: [13.405, 52.52]
  },
  {
    id: 3,
    country: "Netherlands",
    city: "Amsterdam",
    venue: "Amsterdam Warehouse",
    name: "Canal Boat Party",
    date: "2026-07-15",
    coordinates: [4.9041, 52.3676]
  },
  {
    id: 4,
    country: "Czechia",
    city: "Prague",
    venue: "Prague Castle Club",
    name: "Castle Erasmus Fest",
    date: "2026-08-02",
    coordinates: [14.4378, 50.0755]
  },
  {
    id: 5,
    country: "Slovakia",
    city: "Bratislava",
    venue: "Bratislava Castle",
    name: "Danube Night Festival",
    date: "2026-08-18",
    coordinates: [17.1077, 48.1486]
  },
  {
    id: 7,
    country: "Kosovo",
    city: "Pristina",
    venue: "Pristina Arena",
    name: "Balkan Erasmus Party",
    date: "2026-09-20",
    coordinates: [21.1655, 42.6629]
  }
];

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true
    });
  }, []);

  return (
    <section className="py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-dreamland mb-8">¿Donde hemos estado?</h2>
      <p className="text-3xl md:text-2xl text-center text-white mb-8">En nuestro primer año de vida, hemos estado en más de 20 países europeos. ¿Puedes encontrar dónde?</p>
      <div className="text-center mb-8 px-4">
        <select value={selectedEvent ? selectedEvent.id : ""} onChange={(e) => {const eventId = e.target.value; const event = events.find(ev => ev.id == eventId); setSelectedEvent(event);}} className="w-full max-w-md mx-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-black">
          <option value="">Selecciona un evento</option>
          {events.map((event) => (<option key={event.id} value={event.id}>{event.name} - {event.city}, {event.country}</option>))}
        </select>
      </div>

      <div className="relative" onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
        <ComposableMap projection="geoMercator" projectionConfig={{scale: 500, center: [10, 58],}} width={1800} height={600} style={{ width: "100%", height: "auto" }}>
          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }) => geographies.filter((geo) => europeanCountries.has(geo.id)).map((geo) => {const data = countryData[geo.id]; return (<Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" onMouseEnter={() => setHoveredCountry(data)} onMouseLeave={() => setHoveredCountry(null)} style={{default: { outline: "none" }, hover: {outline: "none", fill: "#FFE066", cursor: "pointer"}, pressed: { outline: "none" },}} />);})}
          </Geographies>
          {events.map((event) => (<Marker key={event.id} coordinates={event.coordinates} onClick={() => setSelectedEvent(event)}><circle r={6} fill="#FACC15" stroke="#000" strokeWidth={1} style={{ cursor: "pointer" }} /></Marker>))}
        </ComposableMap>

        {hoveredCountry && (
          <div style={{position: 'fixed', left: mousePos.x + 10 + 'px', top: mousePos.y + 10 + 'px', backgroundColor: '#FDE047', color: 'black', padding: '10px', borderRadius: '8px', maxWidth: '200px', zIndex: 1000, pointerEvents: 'none'}}>
            <h3 style={{fontWeight: 'bold', marginBottom: '5px'}}>{hoveredCountry.name}</h3>
            <p style={{margin: '5px 0'}}><strong>Salas:</strong> {hoveredCountry.salas.join(', ')}</p>
            <p style={{margin: '5px 0'}}><strong>Próximos Eventos:</strong> {hoveredCountry.eventos.join(', ')}</p>
          </div>
        )}

      </div>

      {selectedEvent && (
        <div className="mt-6 text-center bg-neutral-800 p-4 rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold text-white">{selectedEvent.name}</h3>
          <p className="text-white">{selectedEvent.city} - {selectedEvent.country}</p>
          <p className="text-white">{selectedEvent.venue}</p>
          <p className="text-sm text-white">{selectedEvent.date}</p>
        </div>
      )}

    </section>
  );
}