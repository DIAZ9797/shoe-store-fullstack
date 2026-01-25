import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  // 1. AMBIL TOKEN (TAPI JANGAN DIUSIR KALAU GAK ADA)
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");

  const [cartItems, setCartItems] = useState([]);
  const [debugMsg, setDebugMsg] = useState("Menunggu data...");

  useEffect(() => {
    // Logika Fetch Data
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedCart.length === 0) {
      setCartItems([]);
      setDebugMsg("Keranjang lokal kosong (belum klik add to cart).");
      return;
    }

    setDebugMsg(
      `Sedang mengambil data produk... (IDs: ${storedCart.join(", ")})`,
    );

    fetch("https://backend-toko-sepatu.vercel.app/api/products")
      .then((res) => res.json())
      .then((products) => {
        const cartProducts = products.filter((product) =>
          storedCart.includes(product._id),
        );
        setCartItems(cartProducts);
        setDebugMsg("Data berhasil dimuat!");
      })
      .catch((err) => {
        console.error(err);
        setDebugMsg("Gagal koneksi ke Backend: " + err.message);
      });
  }, []);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCartItems(newCart);
    const newIds = newCart.map((item) => item._id);
    localStorage.setItem("cart", JSON.stringify(newIds));
  };

  // --- TAMPILAN (TANPA PENGUSIRAN) ---
  return (
    <div className="container mt-5">
      {/* KOTAK DEBUG (UNTUK CEK STATUS) */}
      <div className="alert alert-warning">
        <h4 className="fw-bold">🔧 STATUS DEBUGGING</h4>
        <p>
          <strong>Status Login:</strong>{" "}
          {token ? "✅ SUDAH LOGIN" : "❌ BELUM TERDETEKSI"}
        </p>
        <p>
          <strong>Isi Token:</strong>{" "}
          {token ? token.substring(0, 20) + "..." : "KOSONG"}
        </p>
        <p>
          <strong>Status Data:</strong> {debugMsg}
        </p>
      </div>

      <h2 className="mb-4">🛒 Keranjang Belanja</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h3>Keranjang Anda Kosong</h3>
          <Link to="/products" className="btn btn-dark mt-3">
            Belanja Dulu Yuk
          </Link>
        </div>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text fw-bold text-danger">
                    Rp {item.price.toLocaleString()}
                  </p>
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
