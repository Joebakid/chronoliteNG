import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import WatchGrid from "./components/watches";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FemaleBags from "./components/FemaleBags";
import Review from "./components/Review";
import Footer from "./components/Footer";
import PlainTee from "./components/PlainTee";
import Cap from "./components/Cap";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/LandingPage";
import PageNotFound from "./components/PageNotFound";
import { Analytics } from "@vercel/analytics/react";
import PriceGenerator from './components/PriceGenerator'
import Jewelries from './components/jewelries'
// import { Analytics } from "@vercel/analytics/react"

function Btn({ text, btnClassName, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn">
      {text}
    </a>
  );
}

function App() {
  return (
    <Router>
      <Analytics/>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavBar />

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route index path="/" element={<LandingPage />} />{" "}
            {/* 👈 Landing page only */}
            <Route path="/watches" element={<WatchGrid Btn={Btn} />} />
            <Route path="/plaintee" element={<PlainTee Btn={Btn} />} />
            <Route path="/femalebags" element={<FemaleBags Btn={Btn} />} />
            <Route path="/review" element={<Review Btn={Btn} />} />
            <Route path="/cap" element={<Cap Btn={Btn} />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path='/price-generator' element={<PriceGenerator/>}/>
            <Route path='/La-Yedi store' element={<Jewelries/>}/>
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
