import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import "./cart.css";

export default function Cart() {
  const navigate = useNavigate(); // 2. Aktifkan fungsi navigasi

  // Data dummy sementara
  const cartItems = [
    {
      id: 1,
      name: "Nike Air Zoom",
      price: 1500000,
      img: "https://placehold.co/100",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 2000000,
      img: "https://placehold.co/100",
    },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Keranjang Belanja</h2>

      {cartItems.length > 0 ? (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Rp {item.price.toLocaleString("id-ID")}</p>
                </div>
                <button className="remove-btn">Hapus</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Ringkasan</h3>
            <div className="summary-row">
              <span>Total Item</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="summary-row total">
              <span>Total Harga</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>

            {/* 3. PERBAIKAN DI SINI: Tambahkan onClick */}
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Keranjangmu masih kosong.</p>
          <Link to="/products" className="btn">
            Mulai Belanja
          </Link>
        </div>
      )}
    </div>
  );
}
