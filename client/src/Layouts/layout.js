import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  if (JSON.parse(sessionStorage.getItem("user")) !== null) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div style={{ backgroundColor: "#ff263b" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
