import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Cek apakah ada 'token' user yang tersimpan di Local Storage
  // (Asumsi saat login Anda menyimpan token dengan nama "token" atau "user")
  const token = localStorage.getItem("token") || localStorage.getItem("user");

  if (!token) {
    // Kalau tidak ada token, paksa pindah ke Login
    return <Navigate to="/login" replace />;
  }

  // Kalau ada token, silakan masuk (tampilkan halaman yang dituju)
  return children;
};

export default ProtectedRoute;
