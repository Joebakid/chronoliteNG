import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.webp";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { text: "Watches", href: "/" },
    { text: "Female Bags", href: "/femalebags" },
    { text: "Review", href: "/review" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-600 fixed left-0 right-0 top-0 z-10">
      <div className="container-custom flex items-center justify-between p-2">
        {/* Logo */}
        <Link to="/">
          <img className="w-[30px] rounded-xl" src={logo} alt="logo" />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
                xmlns="http://www.w3.org/2000/svg"
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

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6`}
        >
          {links.map((link, index) => (
            <li key={index}>
              <Link
                className="block py-2 px-4 text-white hover:text-blue-300"
                to={link.href}
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
