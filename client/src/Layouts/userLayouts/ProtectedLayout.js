import { Navigate, Outlet } from "react-router-dom";
import UserHeader from "./header";
import UserSidebar from "./sidebar";
import UserNavbar from "./navbar";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
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
