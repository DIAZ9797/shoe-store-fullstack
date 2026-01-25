import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ambil data user dari Local Storage
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Kalau gak ada token, tendang ke login
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirm = window.confirm("Yakin ingin keluar?");
    if (confirm) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart"); // Opsional: Hapus keranjang saat logout
      window.location.href = "/"; // Refresh penuh ke Home
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      fontFamily: "sans-serif",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "40px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    avatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: "#ddd",
      margin: "0 auto 20px auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      color: "#666",
    },
    name: { fontSize: "1.8rem", margin: "10px 0", fontWeight: "bold" },
    email: { color: "#666", marginBottom: "30px", fontSize: "1rem" },
    btnGroup: { display: "flex", flexDirection: "column", gap: "15px" },
    btnLogout: {
      padding: "12px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "1rem",
    },
    btnEdit: {
      padding: "12px",
      backgroundColor: "#111",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Avatar Bulat Sederhana */}
        <div style={styles.avatar}>
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.email}>{user.email}</p>

        <div style={styles.btnGroup}>
          <button
            style={styles.btnEdit}
            onClick={() => alert("Fitur Edit Profil segera hadir!")}
          >
            ⚙️ Pengaturan Akun
          </button>
          <button style={styles.btnLogout} onClick={handleLogout}>
            🚪 Keluar (Logout)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
