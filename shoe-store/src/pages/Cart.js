import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  // 1. Cek Token (Hanya untuk info di layar, bukan untuk mengusir)
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Ambil data ID produk yang tersimpan di Local Storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Jika keranjang kosong, stop di sini
    if (storedCart.length === 0) {
      setCartItems([]);
      return;
    }

    // Ambil data produk dari Backend
    fetch("https://backend-toko-sepatu.vercel.app/api/products")
      .then((res) => res.json())
      .then((products) => {
        // Filter: Hanya ambil produk yang ID-nya ada di keranjang kita
        const cartProducts = products.filter((product) =>
          storedCart.includes(product._id),
        );
        setCartItems(cartProducts);
      })
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  // Fungsi Hapus Barang
  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCartItems(newCart);
    const newIds = newCart.map((item) => item._id);
    localStorage.setItem("cart", JSON.stringify(newIds));
  };

  return (
    <div className="container mt-5">
      {/* --- KOTAK KUNING DEBUGGING (Tanda Kode Baru Masuk) --- */}
      <div className="alert alert-warning text-center">
        <h4>🚧 MODE DEBUG AKTIF 🚧</h4>
        <p>
          Jika Anda melihat kotak ini, berarti halaman Cart SUDAH BISA DIBUKA.
        </p>
        <p>
          Status Token di Browser:{" "}
          <strong>{token ? "ADA ✅" : "TIDAK ADA ❌"}</strong>
        </p>
      </div>
      {/* ----------------------------------------------------- */}

      <h2 className="mb-4">Keranjang Belanja</h2>

      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <h4>Keranjang Anda Kosong</h4>
          <Link to="/" className="btn btn-dark mt-3">
            Belanja Sekarang
          </Link>
        </div>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={item.name}
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
