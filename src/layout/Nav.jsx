import { useContext, useState } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom"; // Añadimos useLocation y NavLink
import { AuthContext } from "../context/AuthContext";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Esto nos dice en qué URL estamos

  // Función para no repetir clases de Tailwind tan largas
  const linkStyles = (path) => {
    const isActive = location.pathname === path;
    return `relative text-white inline-block pb-0.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full transition-transform duration-300 ease-in-out ${
      isActive ? "after:w-full" : "after:w-0"
    }`;
  };

  return (
    <>
      <button 
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1 self-center" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`self-center block w-8 h-0.5 bg-white transform transition duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`self-center block w-8 h-0.5 bg-white transition duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
        <span className={`self-center block w-8 h-0.5 bg-white transform transition duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>

      <nav className={`absolute md:static top-full left-0 w-full md:w-auto bg-blue-700 md:bg-transparent overflow-hidden md:overflow-visible transition-all duration-300 ease-in-out z-50 ${menuOpen ? "max-h-[500px] opacity-100 p-6" : "max-h-0 opacity-0 p-0"} md:max-h-none md:opacity-100 md:p-0`} aria-label="Main navigation">
        
        <div className="flex flex-col md:flex-row items-center gap-4 mt-6 md:mt-0">
          <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full md:flex-1 md:justify-center">
            
            <li>
              <Link to="/" className={linkStyles("/")}>Home</Link>
            </li>

            <li>
              <Link to="/destination" className={linkStyles("/destination")}>Destinations</Link>
            </li>

            <li>
              <Link to="/Tours" className={linkStyles("/Tours")}>Tours</Link>
            </li>
        
            {user ? (
              <>
                <li>
                  <Link to="/UserProfile" className="relative inline-flex items-center group">
                    <span className={`text-white font-medium px-5 py-2.5 rounded-xl border border-blue-500/50 shadow-inner transition-all duration-300 ease-in-out hover:bg-blue-500 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] ${location.pathname === '/UserProfile' ? 'bg-blue-500 shadow-md' : 'bg-blue-600'}`}>
                      Hello, {user.firstname}
                    </span>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => { localStorage.removeItem("user"); localStorage.removeItem("token"); window.location.reload(); }} 
                    className="relative cursor-pointer text-white inline-block pb-0.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link className={linkStyles("/login")} to="/login">Log in</Link>
              </li>
            )}
          </ul>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-6 md:mt-0">
            <Link
              to="/groups"
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl transition"
            >
              WhatsApp groups
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}