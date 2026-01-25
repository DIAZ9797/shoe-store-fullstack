import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Cart = () => {
  // --- MATA-MATA (DEBUGGING) ---
  // Kita ambil SEMUA isi Local Storage biar tahu namanya apa
  const allKeys = Object.keys(localStorage);
  const allData = JSON.stringify(localStorage);

  // Tampilkan di Console (Inspect Element)
  console.log("=== CEK ISI LOCAL STORAGE ===");
  console.log("Kunci yang ada:", allKeys);
  console.log("Data lengkap:", allData);
  // -----------------------------

  // Coba ambil dengan berbagai kemungkinan nama umum
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userInfo = localStorage.getItem("userInfo");
  const session = localStorage.getItem("session");

  // Kalau SALAH SATU ada isinya, berarti Login berhasil
  const isLoggedIn = token || user || userInfo || session;

  const [cartItems, setCartItems] = useState([]);

  // --- CEGAT DI SINI ---
  if (!isLoggedIn) {
    // JANGAN DI-REDIRECT DULU BIAR KITA BISA LIHAT CONSOLE
    // return <Navigate to="/login" replace />;

    // Ganti dengan pesan Error sementara biar ketahuan
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">AKSES DITOLAK (DEBUG MODE)</h2>
        <p>Sistem tidak menemukan tanda pengenal Login.</p>
        <div className="alert alert-warning text-break">
          <strong>Isi Local Storage Anda saat ini:</strong> <br />
          {allData === "{}" ? "KOSONG (Belum tersimpan apa-apa)" : allData}
        </div>
        <p>
          Silakan Screenshot layar ini dan kirim ke chat agar saya bisa perbaiki
          kodenya.
        </p>
        <a href="/login" className="btn btn-primary">
          Kembali ke Login
        </a>
      </div>
    );
  }

  // LOGIKA FETCH DATA (SAMA SEPERTI BIASA)
  // ... (Bagian bawah ini hanya jalan kalau isLoggedIn = TRUE)
  // Karena kita sedang debug, bagian ini mungkin tidak tereksekusi kalau isLoggedIn false.

  return (
    <div className="container mt-5">
      <h2>Keranjang Belanja (Akses Diterima)</h2>
      <p>Selamat, kunci ditemukan!</p>
      {/* ... kodingan cart lainnya ... */}
    </div>
  );
};

export default Cart;
