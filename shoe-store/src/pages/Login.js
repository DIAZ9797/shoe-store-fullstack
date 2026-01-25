import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState("Siap Login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sedang mencoba menghubungi server...");

    // DAFTAR KEMUNGKINAN ALAMAT BACKEND
    // Kita akan coba satu per satu sampai ketemu yang benar
    const possibleEndpoints = [
      "https://backend-toko-sepatu.vercel.app/api/auth/login",
      "https://backend-toko-sepatu.vercel.app/api/users/login",
      "https://backend-toko-sepatu.vercel.app/api/login",
      "https://backend-toko-sepatu.vercel.app/login",
    ];

    let success = false;

    for (const url of possibleEndpoints) {
      try {
        console.log(`Mencoba login ke: ${url}`);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        // Kalau server merespon (bukan 404 Not Found), berarti alamat BENAR
        if (response.status !== 404) {
          const data = await response.json();

          if (response.ok) {
            // LOGIN BERHASIL!
            const token =
              data.token || data.accessToken || (data.data && data.data.token);

            if (token) {
              localStorage.setItem("token", token);
              localStorage.setItem("userInfo", JSON.stringify(data));
              login(data);

              alert(
                `BERHASIL! Link yang benar adalah:\n${url}\n\nToken sudah disimpan.`,
              );
              window.location.href = "/cart"; // Redirect paksa
              success = true;
              return; // Stop loop
            }
          } else {
            // Alamat benar, tapi Password Salah
            alert(data.message || "Password salah!");
            setStatus("Gagal: Password Salah");
            success = true; // Kita anggap sukses nemu link, cuma salah password
            return;
          }
        }
      } catch (err) {
        console.log(`Gagal di ${url}:`, err);
      }
    }

    if (!success) {
      setStatus("Gagal total. Semua link server mati/salah.");
      alert(
        "Semua kemungkinan link backend sudah dicoba dan GAGAL (404/Error). Cek kode Backend Anda.",
      );
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2 className="text-primary">Login (Auto-Detect Link)</h2>
      <p className="text-muted small">{status}</p>

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
            background: "blue",
            color: "white",
            fontWeight: "bold",
          }}
        >
          COBA LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
