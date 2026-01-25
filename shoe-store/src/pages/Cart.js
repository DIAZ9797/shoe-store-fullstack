import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // KITA HAPUS SEMUA LOGIKA PENGUSIRAN DI SINI
    // Biarkan halaman tampil apa adanya
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedCart.length === 0) {
      setCartItems([]);
      return;
    }

    fetch("https://backend-toko-sepatu.vercel.app/api/products")
      .then((res) => res.json())
      .then((products) => {
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
      {/* KOTAK KUNING INI TANDA KODINGAN BARU SUDAH MASUK */}
      <div className="alert alert-warning text-center">
        <h4>🚧 MODE DEBUG AKTIF 🚧</h4>
        <p>Jika kotak kuning ini muncul, berarti update BERHASIL.</p>
        <p>
          Status Token Anda:{" "}
          <strong>{token ? "ADA ✅" : "TIDAK ADA ❌"}</strong>
        </p>
      </div>

      <h2 className="mb-4">Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={item.image}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt="sepatu"
                />
                <div className="card-body">
                  <h5>{item.name}</h5>
                  <p>Rp {item.price}</p>
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
