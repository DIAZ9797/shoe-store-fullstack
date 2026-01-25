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
      // Tembak API Backend
      const response = await fetch(
        "https://shoe-store-fullstack-alpha.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // 2. Simpan Info User lengkap (buat jaga-jaga)
        localStorage.setItem("userInfo", JSON.stringify(data));

        // 3. Update state aplikasi
        login(data);

        alert("Login Berhasil! Token disimpan.");

        // 4. Pindah ke halaman Cart (sesuai tujuan awal) atau Home
        navigate("/cart");
        // -----------------------------------
      } else {
        alert(data.message || "Login gagal, periksa email/password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Gagal terhubung ke server.");
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Login Dulu Bos</h2>
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
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          MASUK
        </button>
      </form>
    </div>
  );
};

export default Login;
