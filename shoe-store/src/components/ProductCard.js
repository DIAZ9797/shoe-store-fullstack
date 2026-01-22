import React from "react";
import "./productCard.css";

export default function ProductCard({ image, name, price, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <img
        src={image || "https://placehold.co/300x200"}
        alt={name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{name}</h3>
        <p className="price">Rp {price.toLocaleString("id-ID")}</p>
        <button className="btn">Lihat Detail</button>
      </div>
    </div>
  );
}
