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
        alert("✅ Berhasil ditambahkan ke Keranjang!");
      } else {
        alert("⚠️ Produk ini sudah ada di keranjang Anda.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5 py-5">
        <h3>Memuat Produk...</h3>
      </div>
    );
  if (!product)
    return (
      <div className="text-center mt-5 py-5 text-danger">
        <h3>Produk tidak ditemukan</h3>
      </div>
    );

  return (
    <div className="container py-5">
      <Link to="/products" className="btn btn-outline-secondary mb-4">
        &larr; Kembali ke Katalog
      </Link>

      <div className="card shadow-lg border-0 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6 bg-light d-flex align-items-center justify-content-center">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              style={{
                maxHeight: "500px",
                objectFit: "contain",
                padding: "20px",
              }}
            />
          </div>

          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <span className="text-uppercase text-muted fw-bold small tracking-wide mb-2">
              {product.category || "Sepatu Original"}
            </span>
            <h1 className="fw-bold display-5 mb-3">{product.name}</h1>
            <h3 className="text-danger fw-bold mb-4">
              Rp {product.price ? product.price.toLocaleString() : "0"}
            </h3>

            <p className="text-muted lead mb-4">
              {product.description ||
                "Sepatu berkualitas tinggi dengan desain modern, cocok untuk gaya hidup aktif Anda."}
            </p>

            <p className="mb-4">
              <strong>Stok Tersedia:</strong> {product.stock} pasang
            </p>

            <button
              onClick={handleAddToCart}
              className="btn btn-dark btn-lg w-100 py-3 fw-bold rounded-pill shadow-sm"
              style={{ transition: "all 0.3s" }}
            >
              + TAMBAH KE KERANJANG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
