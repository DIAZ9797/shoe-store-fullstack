import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://backend-toko-sepatu.vercel.app/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => String(p._id) === String(id));
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    try {
      let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (!currentCart.includes(id)) {
        currentCart.push(id);
        localStorage.setItem("cart", JSON.stringify(currentCart));
        alert("✅ Sukses! Barang masuk keranjang.");
      } else {
        alert("⚠️ Barang ini sudah ada di keranjang.");
      }
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  if (loading)
    return (
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>
        Sedang memuat...
      </h3>
    );
  if (!product)
    return (
      <h3 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Produk tidak ditemukan
      </h3>
    );

  // --- STYLE RESPONSIF ---
  const containerStyle = {
    maxWidth: "1000px",
    margin: "20px auto",
    padding: "20px",
    display: "flex",
    gap: "40px",
    flexWrap: "wrap", // <--- PENTING: Biar turun ke bawah di HP
    justifyContent: "center",
  };

  const imageStyle = {
    flex: "1 1 300px", // Minimal lebar 300px, kalau layar <300px dia akan ngecil
    minWidth: "280px", // Batas aman HP
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  };

  const infoStyle = {
    flex: "1 1 300px",
    minWidth: "280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      {/* GAMBAR */}
      <div style={imageStyle}>
        <Link
          to="/products"
          style={{
            display: "inline-block",
            marginBottom: "20px",
            color: "#555",
            textDecoration: "none",
          }}
        >
          &larr; Kembali
        </Link>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #eee",
          }}
        />
      </div>

      {/* INFO PRODUK */}
      <div style={infoStyle}>
        <h1
          style={{ fontSize: "2rem", marginBottom: "10px", lineHeight: "1.2" }}
        >
          {product.name}
        </h1>
        <h2
          style={{ color: "#d9534f", fontSize: "1.8rem", marginBottom: "20px" }}
        >
          Rp {product.price ? product.price.toLocaleString() : "0"}
        </h2>

        <p style={{ color: "#666", lineHeight: "1.6", fontSize: "1rem" }}>
          {product.description || "Deskripsi belum tersedia."}
        </p>

        <div
          style={{
            margin: "20px 0",
            padding: "15px",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            borderRadius: "5px",
          }}
        >
          <strong>Stok Tersedia:</strong> {product.stock} pasang
        </div>

        <button
          onClick={handleAddToCart}
          style={{
            padding: "18px",
            backgroundColor: "#222",
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
            width: "100%",
            letterSpacing: "1px",
          }}
        >
          + TAMBAH KE KERANJANG
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
