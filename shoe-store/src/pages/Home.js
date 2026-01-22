// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Find Your <span className="highlight">Perfect</span> Step
          </h1>
          <p>
            Koleksi sepatu eksklusif dengan kenyamanan maksimal dan desain
            trendi.
          </p>
          <Link to="/products" className="cta-button">
            Belanja Sekarang
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-item">
          📦 <strong>Gratis Ongkir</strong> <br />
          Seluruh Indonesia
        </div>
        <div className="feature-item">
          🛡️ <strong>Garansi Asli</strong> <br />
          100% Original
        </div>
        <div className="feature-item">
          🔄 <strong>Tukar Size</strong> <br />7 Hari Pengembalian
        </div>
      </section>
    </div>
  );
}
