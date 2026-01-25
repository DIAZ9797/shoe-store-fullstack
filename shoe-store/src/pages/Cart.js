import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Cart = () => {
  // Cek apakah ada Token tersimpan
  const token = localStorage.getItem("token");

  // Logic Pengusiran: Kalau tidak ada token, jangan tampilkan halaman
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // --- Kalau lolos (ada token), baru jalankan kode di bawah ini ---

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cartItems, setCartItems] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Ambil data keranjang dari LocalStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedCart.length === 0) {
      setCartItems([]);
      return;
    }

    // Ambil detail produk dari server
    fetch("https://backend-toko-sepatu.vercel.app/api/products")
      .then((res) => res.json())
      .then((products) => {
        // Filter hanya produk yang ada di keranjang
        const cartProducts = products.filter((product) =>
          storedCart.includes(product._id),
        );
        setCartItems(cartProducts);
      })
      .catch((err) => console.error(err));
  }, []);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCartItems(newCart);
    const newIds = newCart.map((item) => item._id);
    localStorage.setItem("cart", JSON.stringify(newIds));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Keranjang masih kosong. Yuk belanja!
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
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text fw-bold text-danger">
                    Rp {item.price.toLocaleString()}
                  </p>
                  <button
                    className="btn btn-outline-danger mt-auto"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Hapus Barang
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
