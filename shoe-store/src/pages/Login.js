import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
      // Menggunakan Link Backend yang sudah terbukti benar
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

          // Redirect paksa agar state segar
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

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body">
          <h3 className="text-center fw-bold mb-4">Selamat Datang</h3>
          <p className="text-center text-muted mb-4">
            Silakan login untuk lanjut belanja
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold small">Email Address</label>
              <input
                type="email"
                className="form-control p-3 bg-light border-0"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small">Password</label>
              <input
                type="password"
                className="form-control p-3 bg-light border-0"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-3 fw-bold mb-3"
              disabled={loading}
            >
              {loading ? "Memproses..." : "LOGIN SEKARANG"}
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted small">Belum punya akun? </span>
            <Link
              to="/register"
              className="text-primary fw-bold text-decoration-none"
            >
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
