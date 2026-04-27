import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function Tours() {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        // Enviamos los filtros actuales a la API de Laravel
        const response = await axios.get("http://127.0.0.1:8000/api/tours", {
          params: { destination, duration }
        });
        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [destination, duration]); // Se dispara cada vez que cambian los filtros en la URL

  if (loading) return <div className="p-20 text-center">Finding the best adventures...</div>;

  return (
    <main className="w-full px-6 py-12">
      {/* Tu cabecera de filtros se mantiene igual (¡es genial!) */}
      
      <section className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tours.length > 0 ? (
          tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col gap-4">
              <figure className="w-full h-48 overflow-hidden rounded-xl">
                <img
                  src={tour.image_url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              <h3 className="text-xl font-semibold">{tour.title}</h3>
              <p className="text-gray-500 text-sm italic">{tour.destination?.name}</p>
              <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-blue-700 font-bold text-lg">€{tour.price}</span>
                <Link 
                  to={`/tours/${tour.id}`} 
                  className="bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">
            No tours found matching your search.
          </div>
        )}
      </section>
    </main>
  );
}