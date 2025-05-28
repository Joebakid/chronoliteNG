import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wiki from "./WikiBlog";
import AboutChronolite from "./AboutChronolite";

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

function CurrentCollection({ src, alt, name, className = "", details }) {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="w-64 h-80 perspective">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded shadow-lg"
          />
          <div
            onClick={handleToggle}
            className="absolute bottom-0 w-full bg-slate-700 text-white text-center p-2 cursor-pointer hover:bg-slate-900 transition"
          >
            <Link>{name}</Link>
          </div>
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full bg-white text-black rounded shadow-lg  backface-hidden rotate-y-180 flex flex-col justify-center items-center">
          <p className="text-sm py-4 my-4">{details}</p>
          <button
            onClick={handleToggle}
            className=" px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

// export default CurrentCollection;

function LandingPage() {
  useEffect(() => {
    document.title = "Chronolite"; // Update the tab name
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="text-center p-4 py-20 mt-28  text-white min-h-screen   w-full watch-bg ">
      <div className="container">
        <div className="">
          <h1 className="text-5xl sm:text-3xl font-bold mb-6  ">
            Chronolite NG
          </h1>
          <p className="text-xl mb-8  ">
            Discover stylish watches, quality bags, and fashionable wear — all
            in one place.
          </p>
        </div>
        <Link
          to="/watches"
          className="inline-block  bg-slate-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
        >
          Shop Now
        </Link>
        <h3 className="text-xl mt-52 uppercase ">New Collection</h3>
        <div className="br"></div>
        <div className="flex flex-col md:flex-row mt-0 gap-5 items-center justify-center sm:flex-col bg-white pt-5 pb-5 text-black rounded">
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/8f038be5-7f62-437b-a8f5-ebaeb414776e.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="INCASEDA Chronograph Multifunctional Quartz Watch, Ultra Bright Luminous Fashionable Quartz Watch"
            className="w-64 h-auto rounded shadow-lg cursor-pointer"
            name="INCASEDA Chronograph"
            details=" 
Type: Chronograph Quartz Watch

Strap: Black perforated leather

Dial: Multi-dial with stopwatch functionality

Color: Silver case, black + white dial, red & yellow accents

Features: Stopwatch, analog time, sporty look "
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/1fa9f1ef-1897-4d64-a3b1-b173927a8701.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="Poedegar gold  Men's Watch : leather straps"
            name="Poedegar gold I"
            details="Type: Quartz Watch

Strap: Black crocodile leather strap

Dial: Gold dial with day/date window

Case: Full gold-tone metal

Style: Formal & luxury design "
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/355c9fd834b7db6dceb3adf481b904e5.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="Poedegar brown  Men's Watch : leather strap"
            name="Poedegar nautialus  I"
            className="w-64 h-auto rounded shadow-lg cursor-pointer"
            details="Type: Quartz Watch

Strap: Brown leather

Dial: Blue horizontal striped dial with date window

Case: Rose gold finish, Nautilus-style shape

Style: Dress watch with a premium look "
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/97d20563-6b05-42ac-b1b2-8ef5d2774431.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="BINBOND Fashion Solid  with leather strap"
            name="BINBOND Brown I"
            className="w-64 h-auto rounded shadow-lg cursor-pointer"
            details="Type: Quartz Watch

Strap: Brown leather with croc texture

Dial: Simple white dial with date window

Case: Polished silver tone

Style: Minimalist and classic everyday wear "
          />
        </div>
        <h3 className="text-xl mt-48 uppercase ">OTHER Models</h3>
        <div className="br"></div>
        <div className="flex flex-col md:flex-row mt-0 gap-5 items-center justify-center sm:flex-col  ">
          <CurrentCollection
            src="https://img.kwcdn.com/product/1d18fce3520/b5325c40-cb90-45cc-ac43-d453ba11978d_1000x1000.jpeg?imageView2/2/w/800/q/70/format/webp"
            alt="Unisex Simple Fashion Hollow Out Strap Watch Fancy  n Watches"
            name="Tomi Unisex  "
            className="w-64 h-auto rounded shadow-lg cursor-pointer"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/f6009a7b-461a-4ecc-ae5c-271adee5cd47.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="[Ivek] Vintage-Inspired"
            name="[Ivek] Vintage-Inspired"
            className="w-64 h-auto rounded shadow-lg cursor-pointer"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/f2da9a3be5f56ea367e993b975a0d222.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="SKMEI Men's Fashion Ultra-thin Waterproof Calendar Quartz Watch"
            name="SKMEI Men "
            className="w-64 h-auto rounded shadow-lg cursor-pointer"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/6c63eb0a-b6e2-4c54-a925-ce24a5b043e5.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="POEDAGAR Leisure Fashion Men's Watch Night Glow Calendar Men's Watch High Quality Leather Men's Quartz Watch"
            name="Mantiano nautialus "
            className="w-64 h-auto rounded shadow-lg cursor-pointer"
          />
        </div>
        {/* <Wiki topic="Mechanical watch" /> */}
        <AboutChronolite />
      </div>
    </div>
  );
}

export default LandingPage;
