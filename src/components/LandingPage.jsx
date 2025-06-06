import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AboutChronolite from "./AboutChronolite";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CurrentCollection({
  src,
  alt,
  name,
  className = "",
  type,
  dial,
  strap,
  color,
  feature,
}) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => {
    setFlipped((prev) => !prev);
  };

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div ref={cardRef} className={`w-64 h-80 perspective ${className}`}>
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
        <div className="absolute w-full h-full bg-white text-black rounded shadow-lg backface-hidden rotate-y-180 flex flex-col justify-between px-4 py-6">
          <div className="flex flex-col items-center text-center gap-2">
            {type && <p className="text-sm">{type}</p>}
            {dial && <p className="text-sm">{dial}</p>}
            {strap && <p className="text-sm">{strap}</p>}
            {color && <p className="text-sm">{color}</p>}
            {feature && <p className="text-sm">{feature}</p>}
          </div>
          <button
            onClick={handleToggle}
            className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.title = "Chronolite";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1 },
        "+=0.2" // delay between animations
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1 },
        "+=0.2" // delay between animations
      );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="text-center p-4 py-20 mt-28 text-white min-h-screen w-full watch-bg">
      <div className="container-custom-collection">
        {/* Header Section */}
        <div>
          <h1 ref={headingRef} className="text-5xl sm:text-3xl font-bold mb-6">
            Chronolite NG
          </h1>
          <p ref={paragraphRef} className="text-xl mb-8">
            Discover stylish watches, quality bags, and fashionable wear — all
            in one place.
          </p>
        </div>

        {/* Shop Now Button */}
        <Link
          ref={buttonRef}
          to="/watches"
          className="inline-block bg-slate-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
        >
          Shop Now
        </Link>

        {/* New Collection Section */}
        <h3 className="text-xl mt-52 uppercase">New Collection</h3>
        <div className="br"></div>
        <div className="flex flex-col md:flex-row mt-0 gap-5 items-center justify-center sm:flex-col   pt-5 pb-5 text-black rounded">
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/8f038be5-7f62-437b-a8f5-ebaeb414776e.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="INCASEDA Chronograph Multifunctional Quartz Watch"
            name="INCASEDA Chronograph"
            type="Chronograph Quartz Watch"
            strap="Black perforated leather"
            dial="Multi-dial with stopwatch functionality"
            color="Silver case, black + white dial, red & yellow accents"
            feature="Stopwatch, analog time, sporty look"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/1fa9f1ef-1897-4d64-a3b1-b173927a8701.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="Poedegar gold Men's Watch"
            name="Poedegar gold I"
            type="Quartz Watch"
            strap="Black crocodile leather strap"
            dial="Gold dial with day/date window"
            color="Full gold-tone metal"
            feature="Formal & luxury design"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/355c9fd834b7db6dceb3adf481b904e5.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="Poedegar brown Men's Watch"
            name="Poedegar Nautialus I"
            type="Quartz Watch"
            strap="Brown leather"
            dial="Blue horizontal striped dial with date window"
            color="Rose gold finish, Nautilus-style shape"
            feature="Dress watch with a premium look"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/97d20563-6b05-42ac-b1b2-8ef5d2774431.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="BINBOND Fashion Solid"
            name="BINBOND Brown I"
            type="Quartz Watch"
            strap="Brown leather with croc texture"
            dial="Simple white dial with date window"
            color="Polished silver tone"
            feature="Minimalist and classic everyday wear"
          />
        </div>

        {/* Other Models Section */}
        <h3 className="text-xl mt-48 uppercase">Other Models</h3>
        <div className="br"></div>
        <div className="flex flex-col md:flex-row mt-0 gap-5 items-center justify-center sm:flex-col">
          <CurrentCollection
            src="https://img.kwcdn.com/product/1d18fce3520/b5325c40-cb90-45cc-ac43-d453ba11978d_1000x1000.jpeg?imageView2/2/w/800/q/70/format/webp"
            alt="Unisex Simple Fashion Hollow Out Strap Watch Fancy n Watches"
            name="Tomi Unisex"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/f6009a7b-461a-4ecc-ae5c-271adee5cd47.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="[Ivek] Vintage-Inspired"
            name="[Ivek] Vintage-Inspired"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/f2da9a3be5f56ea367e993b975a0d222.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="SKMEI Men's Fashion Ultra-thin Waterproof Calendar Quartz Watch"
            name="SKMEI Men"
          />
          <CurrentCollection
            src="https://img.kwcdn.com/product/fancy/6c63eb0a-b6e2-4c54-a925-ce24a5b043e5.jpg?imageView2/2/w/800/q/70/format/webp"
            alt="POEDAGAR Leisure Fashion Men's Watch Night Glow Calendar Men's Watch High Quality Leather Men's Quartz Watch"
            name="Mantiano nautialus"
          />
        </div>

        {/* About Section */}
        <AboutChronolite />
      </div>
    </div>
  );
}

export default LandingPage;
