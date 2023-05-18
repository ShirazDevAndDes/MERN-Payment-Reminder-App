import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserHeader from "./header";
import UserSidebar from "./sidebar";
import UserNavbar from "./navbar";

export default function UserLayout() {
  if (JSON.parse(sessionStorage.getItem("user")) === null) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container-fluid">
      <div className="row minvh-100">
        <UserHeader />
        {/* <UserSidebar /> */}
        <div className="col-12 bg-light p-0">
          <UserNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
