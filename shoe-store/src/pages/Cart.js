import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // 2. Aktifkan navigasi

  // --- SATPAM (LOGIKA PROTEKSI) ---
  useEffect(() => {
    // Cek apakah ada data user/token yang tersimpan
    // Kita cek dua kemungkinan nama kunci biar aman: "userInfo" atau "token"
    const user = localStorage.getItem("userInfo");
    const token = localStorage.getItem("token");

    // Jika KEDUANYA kosong, berarti belum login
    if (!user && !token) {
      // Tampilkan pesan (opsional, biar jelas)
      alert("Anda harus login untuk melihat keranjang!");
      // Tendang ke halaman login
      navigate("/login");
    }
  }, [navigate]);
  // --------------------------------

  // --- LOGIKA LOAD DATA KERANJANG (SAMA SEPERTI SEBELUMNYA) ---
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedCart.length === 0) {
      setCartItems([]);
      return;
    }

    // Pastikan link ini sesuai backend Anda
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
      <h2>Keranjang Belanja Anda</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang masih kosong. Yuk belanja!</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Rp {item.price}</p>
                  <button
                    className="btn btn-danger"
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
