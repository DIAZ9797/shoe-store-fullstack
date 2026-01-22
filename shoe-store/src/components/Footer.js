// src/components/Footer.js
import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>👟 Shoe Store</h3>
          <p>Langkah terbaik dimulai dari sini.</p>
        </div>
        <div className="footer-section">
          <h4>Layanan</h4>
          <p>Bantuan</p>
          <p>Cara Pengembalian</p>
          <p>Status Order</p>
        </div>
        <div className="footer-section">
          <h4>Hubungi Kami</h4>
          <p>support@shoestore.id</p>
          <p>+62 823 2031 0960</p>
        </div>
      </div>
      <div className="footer-bottom">
        <small>
          &copy; {new Date().getFullYear()} Shoe Store. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
