// src/pages/Checkout.js
import React from "react";
import "./checkout.css";

export default function Checkout() {
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="form-section">
          <h2>📦 Alamat Pengiriman</h2>
          <form>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input type="text" placeholder="Dicky Azkia" />
            </div>
            <div className="form-group">
              <label>Nomor Telepon</label>
              <input type="text" placeholder="082320310960" />
            </div>
            <div className="form-group">
              <label>Alamat Lengkap</label>
              <textarea
                rows="3"
                placeholder="Jalan, No Rumah, Kecamatan..."
              ></textarea>
            </div>
            <button type="submit" className="pay-btn">
              Bayar Sekarang
            </button>
          </form>
        </div>

        <div className="summary-section">
          <h3>Ringkasan Pesanan</h3>
          <div className="order-item">
            <span>Nike Air Zoom (x1)</span>
            <span>Rp 1.500.000</span>
          </div>
          <div className="order-item">
            <span>Ongkos Kirim</span>
            <span>Rp 20.000</span>
          </div>
          <hr />
          <div className="order-total">
            <span>Total Tagihan</span>
            <span>Rp 1.520.000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
