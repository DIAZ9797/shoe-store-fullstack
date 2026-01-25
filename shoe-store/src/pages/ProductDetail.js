import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data produk spesifik dari ID
    // Jika endpoint /:id tidak ada, kita fetch semua lalu cari manual (Backup Logic)
    fetch(`https://backend-toko-sepatu.vercel.app/api/products`)
      .then((res) => res.json())
      .then((data) => {
        // Cari produk yang ID-nya cocok dengan URL
        // Pastikan ID dibandingkan sebagai string
        const found = data.find((p) => String(p._id) === String(id));
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // --- FUNGSI SAKTI: PAKSA MASUK KERANJANG ---
  const handleAddToCart = () => {
    // 1. Ambil keranjang lama
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Cek apakah barang sudah ada?
    if (!currentCart.includes(id)) {
      // 3. Kalau belum, masukkan ID sepatu ini
      currentCart.push(id);

      // 4. SIMPAN KE MEMORI LAPTOP (Wajib)
      localStorage.setItem("cart", JSON.stringify(currentCart));

      alert("✅ BERHASIL! Sepatu masuk keranjang.\nSilakan cek halaman Cart.");
    } else {
      alert("⚠️ Sepatu ini sudah ada di keranjang Anda.");
    }
  };

  if (loading) return <h3 className="text-center mt-5">Memuat Sepatu...</h3>;
  if (!product)
    return (
      <h3 className="text-center mt-5 text-danger">
        Sepatu tidak ditemukan :(
      </h3>
    );

  return (
    <div className="container mt-5">
      <Link to="/products" className="btn btn-secondary mb-3">
        &larr; Kembali ke Daftar
      </Link>

      <div className="row">
        {/* Gambar Sepatu */}
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        {/* Info & Tombol */}
        <div className="col-md-6">
          <h1 className="fw-bold">{product.name}</h1>
          <h3 className="text-danger fw-bold mb-4">
            Rp {product.price ? product.price.toLocaleString() : "0"}
          </h3>
          <p className="text-muted">
            {product.description || "Tidak ada deskripsi."}
          </p>
          <hr />
          <p>
            <strong>Stok:</strong> {product.stock} pasang
          </p>

          {/* TOMBOL YANG SUDAH DIPERBAIKI */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-lg w-100 fw-bold mt-3"
            style={{ height: "60px", fontSize: "1.2rem" }}
          >
            + MASUKKAN KERANJANG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
