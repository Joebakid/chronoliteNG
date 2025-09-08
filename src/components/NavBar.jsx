import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap plugin registration
gsap.registerPlugin(ScrollTrigger);

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  const links = [
    { text: "Watches", href: "/watches" },
    { text: "Female Bags", href: "/femalebags" },
    { text: "Plain Tee", href: "/plaintee" },
    { text: "Cap", href: "/cap" },
    { text: "Review", href: "/review" },
    {text:'Generate',href:'/price-generator'},
    {text:'La Yedi',href:'/Jewelries'}
  ];

  useEffect(() => {
    document.title = "Chronolite";
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: navRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      ref={navRef}
      className="bg-slate-600 fixed top-0 left-0 right-0 z-50 text-white"
     

    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 lg:py-2">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold px-10">
          Chronolite
        </Link>

        {/* Hamburger (Mobile only) */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-8  px-10">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                className="text-white hover:text-blue-300 transition"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-700 px-4 pt-4 pb-6 space-y-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="block text-white text-lg hover:text-blue-300"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {link.text}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
