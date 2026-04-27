import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Nav from "./Nav.jsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (

      <header className="flex relative items-center justify-between w-full px-8 py-6 bg-blue-700 shadow-lg">

        <h1 className="text-white text-2xl md:text-4xl font-semibold self-center animate-fadeSlideIn">Travel agency</h1>

        <Nav />

      </header>

  );
}