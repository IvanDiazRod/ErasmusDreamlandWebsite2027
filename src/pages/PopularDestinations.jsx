import { Link } from "react-router-dom";

export default function PopularDestinations() {

  const destinations = [
    { src: "img/Honolulu.jpeg", name: "Honolulu", country: "Hawaii" },
    { src: "img/cities/rome/Rome.webp", name: "Rome", country: "Italy" },
    { src: "img/Bali.jpeg", name: "Bali", country: "Indonesia" },
    { src: "img/France.avif", name: "Paris", country: "France" },
  ];

  return (
    <section className="w-full flex justify-center py-16 md:py-20 px-4 sm:px-6">
      <div className="w-full max-w-6xl flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800">Popular Destinations</h2>
          <Link to="/destination" className="text-blue-600 hover:text-blue-800 transition text-sm md:text-base font-medium">View all →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {destinations.map((dest, idx) => (<div key={idx} className="group relative overflow-hidden rounded-3xl cursor-pointer"><img src={dest.src} alt={`${dest.name} in ${dest.country}`} className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition duration-300"></div><div className="absolute bottom-4 left-4 text-white"><h3 className="text-xl md:text-2xl font-semibold leading-tight">{dest.name}</h3><p className="text-sm md:text-base text-gray-200">{dest.country}</p></div></div>))}
        </div>

      </div>
    </section>
  );
}