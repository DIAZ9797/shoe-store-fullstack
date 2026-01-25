import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // --- DETEKTIF MULAI BEKERJA ---
      // Kita paksa munculkan apa isi 'data' sebenarnya
      alert("ISI DATA DARI SERVER:\n" + JSON.stringify(data, null, 2));
      console.log("Full Data:", data);
      // ------------------------------

      if (response.ok) {
        // Cek paksa: Apakah token ada?
        const tokenYangDidapat =
          data.token || data.accessToken || (data.data && data.data.token);

        if (tokenYangDidapat) {
          localStorage.setItem("token", tokenYangDidapat);
          localStorage.setItem("userInfo", JSON.stringify(data));

          // Panggil Context
          if (login) login(data);

          alert("Token BERHASIL disimpan: " + tokenYangDidapat);

          // Redirect manual biar yakin
          window.location.href = "/cart";
        } else {
          alert(
            "GAWAT! Login sukses tapi Token TIDAK DITEMUKAN di dalam data server.",
          );
        }
      } else {
        alert(data.message || "Login Gagal");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Error Jaringan: " + error.message);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Login (Mode Detektif)</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "red",
            color: "white",
            fontWeight: "bold",
          }}
        >
          CEK LOGIN SEKARANG
        </button>
      </form>
    </div>
  );
};

export default Login;
