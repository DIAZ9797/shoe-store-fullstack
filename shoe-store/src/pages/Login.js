import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-toko-sepatu.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        const token =
          data.token || data.accessToken || (data.data && data.data.token);
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("userInfo", JSON.stringify(data));
          if (login) login(data);
          window.location.href = "/cart";
        }
      } else {
        alert(data.message || "Email atau Password Salah!");
      }
    } catch (error) {
      alert("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  // STYLE UNTUK LOGIN (Biar Rapi)
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    boxSizing: "border-box", // Penting biar gak lewat batas
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#222",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "10px" }}>Selamat Datang</h2>
        <p style={{ color: "#777", marginBottom: "30px" }}>
          Silakan login untuk belanja
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "left" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>
              Email
            </label>
            <input
              type="email"
              style={inputStyle}
              placeholder="Contoh: user@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>
              Password
            </label>
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
            {loading ? "Memproses..." : "LOGIN SEKARANG"}
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: "#007bff", fontWeight: "bold" }}>
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
