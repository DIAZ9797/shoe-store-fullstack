import React from "react";

// SATPAM YANG TIDUR (Meloloskan siapa saja)
const ProtectedRoute = ({ children }) => {
  // Langsung return children tanpa cek token/alert apapun
  return children;
};

export default ProtectedRoute;
