// import "./App.css";
import "../src/index.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Jobs from "./Pages/Jobs";
import SingleJob from "./Pages/SingleJob";
import ErrorPage from "./Pages/ErrorPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="font-josefin">
      <Navbar />
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/SingleJob/:id" element={<SingleJob />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
