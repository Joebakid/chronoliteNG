import { useState } from "react";
import "./App.css";
// import Header from "./components/Header";
import NavBar from "./components/NavBar";
import WatchGrid from "./components/watches";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Cart from "./components/Cart";
import FemaleBags from "./components/FemaleBags";
import Review from "./components/Review";
import Footer from "./components/Footer";

function App({ Btn }) {
  function Btn({ text, btnClassName, href }) {
    return (
      <a href={href} target="_blank" className="btn">
        {text}
      </a>
    );
  }
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<WatchGrid Btn={Btn} />} />

        <Route path="/femalebags" element={<FemaleBags Btn={Btn} />} />
        <Route path="/Review" element={<Review Btn={Btn} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
