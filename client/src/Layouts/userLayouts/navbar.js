import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function UserNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand userNavbar navbar-light bg-white shadow-sm">
      <div className="container">
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.username}
            </div>
            <div className="dropdown-menu pb-0" aria-labelledby="dropdownId">
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <button
                className="btn text-bg-danger border-0 rounded-0 rounded-bottom w-100"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
