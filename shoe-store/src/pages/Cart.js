import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
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

        // Hitung Total Harga
        const total = cartProducts.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
      })
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCartItems(newCart);

    // Update Local Storage
    const newIds = newCart.map((item) => item._id);
    localStorage.setItem("cart", JSON.stringify(newIds));

    // Update Harga
    const total = newCart.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">🛒 Keranjang Belanja</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 bg-white shadow-sm rounded">
          <h4 className="text-muted">Keranjang Anda masih kosong.</h4>
          <Link to="/products" className="btn btn-primary mt-3 px-4 py-2">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Daftar Barang */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div key={item._id} className="card mb-3 shadow-sm border-0">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.image}
                      className="img-fluid rounded-start"
                      alt={item.name}
                      style={{
                        height: "120px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title fw-bold mb-1">{item.name}</h5>
                        <p className="card-text text-danger fw-bold">
                          Rp {item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ringkasan Belanja */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 bg-white">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Ringkasan Belanja</h5>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Barang:</span>
                  <strong>{cartItems.length} pcs</strong>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total Harga:</span>
                  <span className="fw-bold text-success fs-5">
                    Rp {totalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  className="btn btn-success w-100 py-2 fw-bold"
                  onClick={() => alert("Fitur Checkout akan segera hadir!")}
                >
                  LANJUT KE PEMBAYARAN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
