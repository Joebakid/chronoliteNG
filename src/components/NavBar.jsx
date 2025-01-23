import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import logo from "../img/logo.webp";
// import { useCart } from "../CartContext"; // Import the cart context to access the cart count

function NavBar() {
  const links = [
    { text: "Watches", href: "/" },
    { text: "Female Bags", href: "/femalebags" },
    { text: "Review", href: "/review" },
  ];

  function NavLink({ href, text }) {
    return (
      <li>
        <Link
          className="link-nav hover:text-blue-300"
          to={href} // Use 'to' for internal navigation
        >
          {text}
        </Link>
      </li>
    );
  }

  function Logo({ imgClassName, src, alt }) {
    return (
      <Link to="/">
        <img className={imgClassName} src={src} alt={alt} />
      </Link>
    );
  }

  return (
    <nav className="bg-slate-600 fixed left-0 right-0 top-0 z-10">
      <div className="container-custom flex items-center justify-between p-2">
        {/* Logo */}
        <Logo src={logo} alt="logo" imgClassName="w-[30px] rounded-xl" />

        {/* Navigation Links */}
        <ul className="w-[50%] flex justify-around">
          {links.map((link, index) => (
            <NavLink href={link.href} text={link.text} key={index} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
