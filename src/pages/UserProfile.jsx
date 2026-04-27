import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Calendar, Camera, Package, LogOut, Plane } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const { user, logout, login } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");

  // Estados para Tours
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Estados para Vuelos
  const [flights, setFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(false);

  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Efecto para cargar datos según la pestaña activa
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (activeTab === "tours") {
      const fetchBookings = async () => {
        setLoadingBookings(true);
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/my-bookings", {
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
          });
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings", error);
        } finally {
          setLoadingBookings(false);
        }
      };
      fetchBookings();
    }

// Dentro del useEffect, donde cargas los vuelos:
if (activeTab === "flights") {
  const fetchFlights = async () => {
    setLoadingFlights(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/my-flights", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });
      
      console.log("DATOS RECIBIDOS:", response.data); // <--- ESTO ES ORO
      setFlights(response.data);
      
    } catch (error) {
      console.error("Error fetching flights", error);
    } finally {
      setLoadingFlights(false);
    }
  };
  fetchFlights();
}
  }, [activeTab]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post("http://127.0.0.1:8000/api/user/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      login(response.data.user, token);
      alert("Photo updated!");
    } catch (error) {
      console.error("Error uploading photo", error);
      alert("Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) return <div className="p-10 text-center">Loading user data...</div>;

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col md:flex-row max-w-6xl mx-auto animate-fadeIn">
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white shadow-md md:min-h-screen p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img 
              src={`${user.profile_photo_url}${user.profile_photo_url.includes('?') ? '&' : '?' }t=${new Date().getTime()}`} 
              alt="Profile" 
              className={`w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-sm transition ${uploading ? "opacity-50" : ""}`}
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <Camera className="text-white" size={24} />
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
          <h2 className="mt-4 font-bold text-gray-800 text-xl text-center">{user.firstname} {user.surname}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <nav className="space-y-2">
          {[
            { key: "profile", label: "Personal Info", icon: User },
            { key: "tours", label: "My Tours", icon: Package },
            { key: "flights", label: "My Flights", icon: Plane },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.key ? "bg-blue-600 text-white shadow-lg scale-[1.02]" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} /> {item.label}
              </button>
            );
          })}
          <hr className="my-4 border-gray-100" />
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition">
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-12">
        
        {/* PESTAÑA PERFIL */}
        {activeTab === "profile" && (
          <section className="animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Personal Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <InfoItem label="First Name" value={user.firstname} />
              <InfoItem label="Surnames" value={`${user.surname} ${user.secondsurname || ''}`} />
              <InfoItem label="Email" value={user.email} />
              <InfoItem label="Date of Birth" value={user.dateofbirth} />
              <InfoItem label="Gender" value={user.gender} />
              <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-50">
                <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md">
                  Edit Profile
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PESTAÑA TOURS */}
        {activeTab === "tours" && (
          <section className="animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Booked Tours</h1>
            {loadingBookings ? (
              <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
            ) : bookings.length > 0 ? (
              <div className="grid gap-6">
                {bookings.map((booking) => {
                  const itemInfo = booking.tour || booking.destination;
                  return (
                    <div key={booking.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition">
                      <img 
                        src={itemInfo?.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} 
                        alt={itemInfo?.title || itemInfo?.name}
                        className="w-full md:w-44 h-32 object-cover rounded-xl shadow-inner bg-gray-50"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-gray-800">{itemInfo?.title || itemInfo?.name || 'Booking Reference'}</h3>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 mt-4 gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2"><Calendar size={16} /> {new Date(booking.travel_date).toLocaleDateString()}</div>
                          <div className="flex items-center gap-2"><User size={16} /> {booking.people_count} {booking.people_count > 1 ? 'people' : 'person'}</div>
                        </div>
                      </div>
                      <div className="flex md:flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                          <span className="text-2xl font-bold text-blue-700">€{(itemInfo?.price || 0) * booking.people_count}</span>
                          <Link to={booking.tour ? `/tours/${itemInfo?.id}` : `/destinations/${itemInfo?.slug || itemInfo?.id}`} className="text-blue-600 text-sm font-semibold hover:underline">View Details</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-blue-50 border-2 border-dashed border-blue-200 p-12 rounded-2xl text-center">
                <Package className="mx-auto text-blue-300 mb-4" size={48} />
                <p className="text-blue-600 font-medium">You haven't booked any tours yet.</p>
                <Link to="/Tours" className="mt-4 inline-block text-blue-700 underline font-semibold">Explore destinations</Link>
              </div>
            )}
          </section>
        )}

        {/* PESTAÑA VUELOS */}
        {activeTab === "flights" && (
          <section className="animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Booked Flights</h1>
            {loadingFlights ? (
              <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
            ) : flights.length > 0 ? (
              <div className="grid gap-6">
{/* PESTAÑA VUELOS ACTUALIZADA */}
{flights.map((flight) => (
  <div key={flight.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition">
    {/* Imagen dinámica: usamos la del destino reservado */}
    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-inner">
      {flight.destination?.image_url ? (
        <img src={flight.destination.image_url} className="w-full h-full object-cover rounded-2xl" alt="Dest" />
      ) : (
        <Plane size={32} />
      )}
    </div>

    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div>
          {/* CAMBIO CLAVE: Usamos flight.destination.name */}
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            My City <span className="text-blue-400">→</span> {flight.destination?.name || 'Destination'}
          </h3>
          <p className="text-sm text-blue-600 font-bold uppercase tracking-wide">
            {flight.airline_name || 'SkyTravel Airlines'}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${flight.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {flight.status}
        </span>
      </div>

      <div className="grid grid-cols-2 mt-4 gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={16} /> 
          {/* Formateo de fecha */}
          {flight.departure_date ? new Date(flight.departure_date).toLocaleDateString() : 'TBA'}
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 px-2 py-0.5 rounded font-mono font-bold text-gray-700 text-xs uppercase">
            Seat: {flight.seat_number || '12B'}
          </div>
        </div>
      </div>
    </div>

    <div className="flex md:flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 text-right">
       <div>
         <p className="text-[10px] text-gray-400 uppercase font-bold">Total</p>
         <span className="text-2xl font-bold text-blue-700">€{flight.price}</span>
       </div>
       <button className="bg-gray-50 hover:bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-gray-100">
         Download Ticket
       </button>
    </div>
  </div>
))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-12 rounded-3xl text-center">
                <Plane className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-medium text-lg">No flights booked yet.</p>
                <Link to="/flights" className="mt-4 inline-block bg-blue-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Find a Flight</Link>
              </div>
            )}
          </section>
        )}
      </main>
    </section>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex flex-col border-b border-gray-50 pb-2">
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</span>
      <span className="text-lg text-gray-700 font-medium">{value || "Not specified"}</span>
    </div>
  );
}