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
      {/* Main Container */}
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavBar />

        {/* Main Content (Centered) */}
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<WatchGrid Btn={Btn} />} />
            <Route path="/plaintee" element={<PlainTee Btn={Btn} />} />
            <Route path="/femalebags" element={<FemaleBags Btn={Btn} />} />
            <Route path="/Review" element={<Review Btn={Btn} />} />
            <Route path="/cap" element={<Cap Btn={Btn} />} />
          </Routes>
        </main>

        {/* Footer Stays at Bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
