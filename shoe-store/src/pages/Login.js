import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // --- INI LINK YANG SUDAH PASTI BENAR 100% ---
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
        // 1. Simpan Token (Wajib ada biar Cart bisa dibuka)
        // Kita cek berbagai kemungkinan nama token dari backend
        const token =
          data.token || data.accessToken || (data.data && data.data.token);

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("userInfo", JSON.stringify(data));

          // Panggil Context untuk update status login di aplikasi
          if (login) login(data);

          alert("Login Berhasil! Selamat Datang.");

          // Pindah ke Cart
          // Kita pakai window.location agar halaman ter-refresh bersih
          window.location.href = "/cart";
        } else {
          alert(
            "Login sukses, tapi Token tidak ditemukan. Cek Controller Backend.",
          );
        }
      } else {
        alert(data.message || "Email atau Password Salah!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Gagal terhubung ke server. Cek koneksi internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2 className="fw-bold">Login Toko Sepatu</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 mt-4">
        <input
          type="email"
          className="form-control"
          placeholder="Masukkan Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="Masukkan Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-dark fw-bold py-2"
          disabled={loading}
        >
          {loading ? "Memuat..." : "MASUK SEKARANG"}
        </button>
      </form>
    </div>
  );
};

export default Login;
