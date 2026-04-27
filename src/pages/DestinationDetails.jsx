import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DestinationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- NUEVOS ESTADOS PARA EL FORMULARIO ---
  const [travelDate, setTravelDate] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/destinations/${slug}`);
        setDestination(response.data);
      } catch (error) {
        console.error("Error cargando el destino", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [slug]);

const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to book a flight!");
      navigate("/login");
      return;
    }

    if (!travelDate) {
      alert("Please select a travel date");
      return;
    }

    setBookingLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/flight-bookings",
        { 
          destination_id: destination.id,
          departure_date: travelDate, 
          // Enviamos el precio total (precio x personas)
          price: destination.price * peopleCount,
          people_count: peopleCount // Asegúrate de recibir esto en el controlador si lo necesitas
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json" 
          } 
        }
      );
      
      console.log("Respuesta del servidor:", response.data);
      alert("🎉 Flight booked successfully!");
      navigate("/profile"); 
    } catch (error) {
      console.error("Error en la reserva:", error.response?.data);
      alert(error.response?.data?.message || "Error processing your booking");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando destino...</div>;
  if (!destination) return <div className="p-10 text-center">Destination not found</div>;

  const gallery = destination.images || [];

  return (
    <section className="min-h-screen bg-gray-50 p-6 md:p-12">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline">
        ← Back
      </button>

      <div className="mb-8">
        <img
          src={destination.src} 
          alt={destination.name}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          {destination.name}, {destination.country}
        </h1>

        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          {destination.description}
        </p>

        {/* --- FORMULARIO DE RESERVA ACTUALIZADO --- */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
{/* --- SECCIÓN DEL PRECIO ACTUALIZADA --- */}
<div className="flex-1 w-full">
  <p className="text-sm font-bold text-gray-400 uppercase mb-2">Total Price</p>
  {/* Multiplicamos el precio del destino por la cantidad de personas */}
  <p className="text-4xl font-bold text-blue-700">
    ${(destination.price * peopleCount).toLocaleString()}
  </p>
  <p className="text-xs text-gray-400 mt-1">${destination.price} per person</p>
</div>

          <div className="flex flex-col gap-1 w-full md:w-auto">
            <label className="text-xs font-bold uppercase text-gray-400">Date</label>
            <input 
              type="date" 
              className="p-2 border rounded-lg focus:ring-2 ring-blue-500 outline-none"
              onChange={(e) => setTravelDate(e.target.value)}
            />
          </div>

<div className="flex flex-col gap-1 w-full md:w-24">
  <label className="text-xs font-bold uppercase text-gray-400">People</label>
  <input 
    type="number" 
    min="1" 
    value={peopleCount}
    className="p-2 border rounded-lg focus:ring-2 ring-blue-500 outline-none"
    // Usamos Number() para asegurar que peopleCount sea un número
    onChange={(e) => setPeopleCount(Number(e.target.value))}
  />
</div>

          <button 
            onClick={handleBooking}
            disabled={bookingLoading}
            className={`${
              bookingLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-8 py-3 rounded-xl transition transform hover:scale-105 w-full md:w-auto`}
          >
            {bookingLoading ? "Booking..." : "Book now"}
          </button>
        </div>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {gallery.map((img, i) => (
                <img key={i} src={img} className="w-48 h-32 md:w-64 md:h-44 object-cover rounded-xl" />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}