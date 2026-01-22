// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <Link to="/" style={{ color: "#333", textDecoration: "none" }}>
          👟 Shoe Store
        </Link>
      </div>
      <nav className="nav">
        <Link to="/">Beranda</Link>
        <Link to="/products">Koleksi</Link>
        <Link to="/cart" className="cart-link">
          🛒 Keranjang
        </Link>
      </nav>
    </header>
  );
}
