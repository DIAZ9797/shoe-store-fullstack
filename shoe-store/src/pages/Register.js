import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Kirim data ke Backend
      const response = await fetch(
        "https://backend-toko-sepatu.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registrasi Berhasil! Silakan Login.");
        navigate("/login"); // Pindah ke halaman Login
      } else {
        alert("Gagal: " + (data.message || "Terjadi kesalahan."));
      }
    } catch (error) {
      alert("Error: Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  // --- STYLE (Sama Persis dengan Login) ---
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)", // Bayangan halus
    width: "100%",
    maxWidth: "400px", // Lebar maksimal biar tidak terlalu lebar
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0 20px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    display: "block",
    textAlign: "left",
    marginBottom: "5px",
    color: "#333",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f1c40f", // Kuning Emas (Pembeda sedikit dengan Login yg Hitam)
    color: "#222",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "10px" }}>Buat Akun Baru</h2>
        <p style={{ color: "#777", marginBottom: "30px" }}>
          Isi data diri untuk mulai belanja
        </p>

        <form onSubmit={handleRegister}>
          {/* Input Nama */}
          <div>
            <label style={labelStyle}>Nama Lengkap</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input Email */}
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              style={inputStyle}
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              style={inputStyle}
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Mendaftarkan..." : "DAFTAR SEKARANG"}
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Sudah punya akun?{" "}
          <Link
            to="/login"
            style={{
              color: "#007bff",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
