import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data
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

  // FUNGSI TESTING SEDERHANA
  const testClick = () => {
    alert("✅ TOMBOL BERFUNGSI! Sekarang kita simpan data...");

    // Logika Simpan ke Keranjang
    try {
      let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (!currentCart.includes(id)) {
        currentCart.push(id);
        localStorage.setItem("cart", JSON.stringify(currentCart));
        alert("Berhasil masuk Local Storage! Cek Cart sekarang.");
      } else {
        alert("Barang sudah ada di keranjang.");
      }
    } catch (e) {
      alert("Error simpan data: " + e.message);
    }
  };

  if (loading) return <h3 className="text-center mt-5">Memuat...</h3>;
  if (!product)
    return <h3 className="text-center mt-5">Produk tidak ditemukan</h3>;

  return (
    <div className="container mt-5" style={{ paddingBottom: "100px" }}>
      <Link to="/products" className="btn btn-secondary mb-3">
        Kembali
      </Link>

      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h1>{product.name}</h1>
          <h3 className="text-danger">Rp {product.price.toLocaleString()}</h3>
          <p>{product.description}</p>

          <hr />

          {/* --- TOMBOL DEBUG MERAH (Anti-Macet) --- */}
          <div
            style={{
              padding: "20px",
              border: "2px dashed red",
              background: "#fff0f0",
            }}
          >
            <p className="text-danger fw-bold">
              👇 KLIK TOMBOL MERAH DI BAWAH 👇
            </p>

            <button
              type="button"
              onClick={testClick}
              style={{
                width: "100%",
                padding: "20px",
                backgroundColor: "red",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                position: "relative", // Biar bisa diatur z-index
                zIndex: 9999, // Supaya muncul PALING ATAS (tidak tertutup)
              }}
            >
              TES KLIK (DEBUG)
            </button>
          </div>
          {/* --------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
