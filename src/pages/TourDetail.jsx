import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function TourDetail() {
  const { id } = useParams(); // Captura el ID de la URL
  const { token } = useContext(AuthContext); // <--- ¡Saca el token directamente de aquí!
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null); // Para mostrar mensajes de éxito/error

const handleBooking = async () => {
    // 1. Verificamos que los estados tengan valor
    if (!travelDate || !peopleCount) {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/bookings', 
            { 
                tour_id: tour.id,
                travel_date: travelDate,   // <--- Laravel pide 'travel_date'
                people_count: peopleCount, // <--- Laravel pide 'people_count'
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            }
        );
        
        alert("¡Reserva confirmada!");
        navigate('/my-bookings'); 

    } catch (error) {
        if (error.response && error.response.data.errors) {
            // Esto te mostrará en consola exactamente qué campo falla según Laravel
            console.error("Errores de validación:", error.response.data.errors);
            alert("Error en el formulario: " + Object.values(error.response.data.errors).flat().join(", "));
        } else {
            console.error("Error desconocido:", error);
        }
    }
};

useEffect(() => {
    const fetchTour = async () => {
        setLoading(true);
        try {
            // Fíjate bien en la URL: api/tours/{id}
            const response = await axios.get(`http://127.0.0.1:8000/api/tours/${id}`);
            setMainImage(response.data.image_url);
            console.log("Datos recibidos de Laravel:", response.data);
            setTour(response.data);
        } catch (error) {
            console.error("Error en la petición:", error.response?.status);
            // Si el error es 404, es que el ID no existe en la DB
        } finally {
            setLoading(false);
        }
    };

    if (id) fetchTour();
}, [id]);

  if (loading) return <div className="p-20 text-center text-2xl">Loading adventure details...</div>;
  if (!tour) return <div className="p-20 text-center">Tour not found.</div>;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-700 hover:underline">
        ← Back to Tours
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Galería de imágenes (Simulada con la principal + placeholders para el ejemplo) */}
<section className="space-y-4">
  {/* Imagen Principal: Se actualiza con el estado mainImage */}
  <img 
    src={mainImage} 
    alt={tour.title} 
    className="w-full h-96 object-cover rounded-3xl shadow-lg transition-all duration-300" 
  />

  {/* Miniaturas */}
  <div className="grid grid-cols-3 gap-4">
    {/* Imagen 1: La del tour */}
    <img 
      src={tour.image_url} 
      className={`h-24 w-full object-cover rounded-xl cursor-pointer transition ${mainImage === tour.image_url ? 'ring-4 ring-blue-500 opacity-100' : 'opacity-60 hover:opacity-100'}`}
      onClick={() => setMainImage(tour.image_url)} 
    />

    {/* Imagen 2: Playa */}
    <img 
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" 
      className={`h-24 w-full object-cover rounded-xl cursor-pointer transition ${mainImage === "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" ? 'ring-4 ring-blue-500 opacity-100' : 'opacity-60 hover:opacity-100'}`}
      onClick={() => setMainImage("https://images.unsplash.com/photo-1507525428034-b723cf961d3e")} 
    />

    {/* Imagen 3: Montaña */}
    <img 
      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
      className={`h-24 w-full object-cover rounded-xl cursor-pointer transition ${mainImage === "https://images.unsplash.com/photo-1469474968028-56623f02e42e" ? 'ring-4 ring-blue-500 opacity-100' : 'opacity-60 hover:opacity-100'}`}
      onClick={() => setMainImage("https://images.unsplash.com/photo-1469474968028-56623f02e42e")} 
    />
  </div>
</section>

        {/* Información y Compra */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-900">{tour.title}</h1>
          <div className="flex items-center gap-4 text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              {tour.duration_days} days
            </span>
            <span>📍 {tour.location}</span>
          </div>
          
          <p className="text-gray-600 leading-relaxed text-lg">
            {tour.description}
          </p>

<div className="mt-auto p-6 bg-white rounded-2xl border-2 border-blue-50 flex flex-col gap-4 shadow-sm">
  <div className="flex gap-4">
    <div className="flex-1">
      <label className="text-xs font-bold uppercase text-gray-400">Travel Date</label>
      <input 
        type="date" 
        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 ring-blue-500 outline-none"
        onChange={(e) => setTravelDate(e.target.value)}
      />
    </div>
    <div className="w-24">
      <label className="text-xs font-bold uppercase text-gray-400">People</label>
      <input 
        type="number" 
        min="1" 
        value={peopleCount}
        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 ring-blue-500 outline-none"
        onChange={(e) => setPeopleCount(e.target.value)}
      />
    </div>
  </div>

  <div className="flex items-center justify-between border-t pt-4">
    <div>
      <p className="text-gray-500 text-sm">Total ({peopleCount} people)</p>
      <p className="text-3xl font-bold text-blue-700">€{tour.price * peopleCount}</p>
    </div>
    <button 
      onClick={handleBooking}
      className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95"
    >
      Confirm & Pay
    </button>
  </div>
</div>
        </section>
      </div>
    </main>
  );
}