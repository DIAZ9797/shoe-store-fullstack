import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Data Form Pembeli
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "transfer",
  });

  // Load Data Keranjang saat halaman dibuka
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kalau keranjang kosong, tendang balik ke Home
    if (storedCart.length === 0) {
      navigate("/");
      return;
    }

    // Ambil detail produk untuk hitung total
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
      .catch((err) => console.error(err));
  }, [navigate]);

  // Handle Ketik di Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- FUNGSI KIRIM ORDER (PENTING) ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // 1. Validasi Form
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Mohon lengkapi Nama, No HP, dan Alamat!");
      return;
    }

    // 2. Siapkan Data Order
    const orderData = {
      buyer: formData,
      items: cartItems,
      total: totalPrice,
      date: new Date().toISOString(),
    };

    // 3. (SIMULASI) Kirim ke Backend
    // Nanti ganti URL ini dengan endpoint order backend Mas
    try {
      console.log("Mengirim Order:", orderData);

      // --- SIMULASI SUKSES ---
      alert(
        `✅ TERIMA KASIH, ${formData.name.toUpperCase()}!\n\nPesanan Anda berhasil dibuat.\nTotal: Rp ${totalPrice.toLocaleString()}\n\nKami akan segera menghubungi WhatsApp Anda.`,
      );

      // 4. Kosongkan Keranjang & Redirect
      localStorage.removeItem("cart");
      navigate("/"); // Balik ke Home
    } catch (error) {
      alert("Gagal membuat pesanan.");
    }
  };

  // --- STYLE (JS Only) ---
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "sans-serif",
    },
    row: { display: "flex", flexWrap: "wrap", gap: "40px" },
    colForm: { flex: "3", minWidth: "300px" },
    colSummary: { flex: "2", minWidth: "250px" },
    card: {
      background: "white",
      padding: "25px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      boxSizing: "border-box",
    },
    label: {
      fontWeight: "bold",
      display: "block",
      marginBottom: "5px",
      fontSize: "0.9rem",
    },
    heading: {
      borderBottom: "1px solid #eee",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    btnOrder: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "1.1rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "30px" }}>🔐 Checkout Pengiriman</h2>

      <div style={styles.row}>
        {/* KOLOM KIRI: FORM DATA DIRI */}
        <div style={styles.colForm}>
          <div style={styles.card}>
            <h4 style={styles.heading}>Alamat Pengiriman</h4>
            <form onSubmit={handlePlaceOrder}>
              <div>
                <label style={styles.label}>Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  style={styles.input}
                  placeholder="Contoh: Budi Santoso"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={styles.label}>Nomor WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  style={styles.input}
                  placeholder="0812..."
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={styles.label}>Alamat Lengkap</label>
                <textarea
                  name="address"
                  rows="3"
                  style={styles.input}
                  placeholder="Jalan, No Rumah, Kelurahan, Kecamatan..."
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label style={styles.label}>Metode Pembayaran</label>
                <select
                  name="paymentMethod"
                  style={styles.input}
                  onChange={handleChange}
                >
                  <option value="transfer">Transfer Bank (BCA/Mandiri)</option>
                  <option value="cod">COD (Bayar di Tempat)</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* KOLOM KANAN: RINGKASAN */}
        <div style={styles.colSummary}>
          <div style={{ ...styles.card, backgroundColor: "#f9f9f9" }}>
            <h4 style={styles.heading}>Ringkasan Pesanan</h4>
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  fontSize: "0.9rem",
                }}
              >
                <span>{item.name}</span>
                <span style={{ fontWeight: "bold" }}>
                  Rp {item.price.toLocaleString()}
                </span>
              </div>
            ))}
            <hr
              style={{
                margin: "20px 0",
                border: "0",
                borderTop: "1px dashed #ccc",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              <span>Total Bayar</span>
              <span style={{ color: "#d9534f" }}>
                Rp {totalPrice.toLocaleString()}
              </span>
            </div>

            <button onClick={handlePlaceOrder} style={styles.btnOrder}>
              BUAT PESANAN SEKARANG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
