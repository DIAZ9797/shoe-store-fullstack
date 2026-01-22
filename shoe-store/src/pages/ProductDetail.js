// src/pages/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetail.css"; // Buat file css baru ini

export default function ProductDetail() {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    fetch(`https://backend-toko-sepatu.vercel.app/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setShoe(data));
  }, [id]);

  if (!shoe) return <div className="loading">Loading...</div>;

  return (
    <div className="detail-page">
      {/* Bagian Atas: Gambar & Info Utama */}
      <div className="detail-container">
        <div className="detail-image">
          <img
            src={shoe.image || "https://placehold.co/500x500"}
            alt={shoe.name}
          />
        </div>

        <div className="detail-info">
          <span className="badge">New Arrival</span>
          <h1>{shoe.name}</h1>
          <div className="rating">⭐⭐⭐⭐⭐ (120 Ulasan)</div>
          <h2 className="price">Rp {shoe.price.toLocaleString("id-ID")}</h2>

          <p className="desc">{shoe.description}</p>

          <div className="actions">
            <div className="size-selector">
              <span>Size:</span>
              <button>40</button>
              <button>41</button>
              <button>42</button>
              <button>43</button>
            </div>
            <button className="add-to-cart">Masuk Keranjang</button>
            <button className="buy-now">Beli Sekarang</button>
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Tab Ulasan */}
      <div className="reviews-section">
        <h3>Ulasan Pembeli</h3>
        <div className="review-card">
          <strong>Budi Santoso</strong> <span>⭐⭐⭐⭐⭐</span>
          <p>Barang original, pengiriman cepat. Mantap!</p>
        </div>
        <div className="review-card">
          <strong>Siti Aminah</strong> <span>⭐⭐⭐⭐</span>
          <p>Sepatunya nyaman dipakai lari, tapi box agak penyok dikit.</p>
        </div>
      </div>
    </div>
  );
}
