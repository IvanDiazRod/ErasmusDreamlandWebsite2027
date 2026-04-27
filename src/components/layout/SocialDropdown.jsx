import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

function SocialDropdown({ currentPath }) {

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const socials = [
    { name: "Instagram", icon: <FaInstagram />, link: "https://instagram.com/erasmusdreamland" },
    { name: "Facebook", icon: <FaYoutube />, link: "https://www.youtube.com/@erasmusdreamland" },
    { name: "Twitter", icon: <FaTwitter />, link: "https://x.com/erasmusdreamlan" },
    { name: "TikTok", icon: <FaTiktok />, link: "https://tiktok.com/@erasmusdreamland" },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
    >

      {/* Botón */}
      <button
        onClick={() => isMobile && setOpen(!open)}
        className={`relative group header-link flex items-center gap-1 ${
          currentPath === "/social" ? "text-dreamland" : ""
        }`}
      >
        Redes sociales

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />

        <span
          className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-dreamland transition-all duration-300 group-hover:w-full ${
            currentPath === "/social" ? "w-full" : ""
          }`}
        ></span>
      </button>

      {/* Dropdown */}
<div
  className={`absolute top-full left-0 mt-4 w-56 lg:w-48 bg-neutral-700 shadow-xl rounded-xl p-3 transition-all duration-300 z-50 ${
    open
      ? "opacity-100 translate-y-0 visible"
      : "opacity-0 -translate-y-2 invisible"
  }`}
>
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-600 transition"
          >
            {social.icon}
            <span>{social.name}</span>
          </a>
        ))}
      </div>

    </div>
  );
}

export default SocialDropdown;