import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

        const total = cartProducts.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
      })
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCartItems(newCart);
    const newIds = newCart.map((item) => item._id);
    localStorage.setItem("cart", JSON.stringify(newIds));

    const total = newCart.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const handleCheckout = () => {
    if (!token) {
      alert("Silakan Login dulu untuk melanjutkan pembayaran 🙏");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "1000px", margin: "20px auto", padding: "20px" }}
    >
      <h2 style={{ fontWeight: "bold", marginBottom: "30px" }}>
        🛒 Keranjang Belanja
      </h2>

      {cartItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <h4 style={{ color: "#888" }}>Keranjang Anda masih kosong.</h4>
          <Link
            to="/products"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#111",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              borderRadius: "5px",
            }}
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // <--- PENTING: Supaya responsif
            gap: "30px",
            alignItems: "flex-start",
          }}
        >
          {/* Daftar Barang */}
          <div style={{ flex: "2 1 400px", minWidth: "100%" }}>
            {cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "20px",
                  }}
                />
                <div style={{ flex: "1" }}>
                  <h4 style={{ fontSize: "1rem", margin: "0 0 5px 0" }}>
                    {item.name}
                  </h4>
                  <p
                    style={{ color: "#d9534f", fontWeight: "bold", margin: 0 }}
                  >
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: "transparent",
                    border: "1px solid #dc3545",
                    color: "#dc3545",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Ringkasan */}
          <div style={{ flex: "1 1 300px", minWidth: "100%" }}>
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  borderBottom: "1px solid #eee",
                  paddingBottom: "15px",
                }}
              >
                Ringkasan
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span>Total Barang:</span>
                <strong>{cartItems.length} item</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                  fontSize: "1.2rem",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Total Harga:</span>
                <span style={{ fontWeight: "bold", color: "#28a745" }}>
                  Rp {totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: token ? "#28a745" : "#111",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                {token ? "LANJUT PEMBAYARAN →" : "LOGIN UNTUK BAYAR 🔒"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
