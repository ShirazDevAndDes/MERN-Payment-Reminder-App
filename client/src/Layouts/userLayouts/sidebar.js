import { Link } from "react-router-dom";

export default function UserSidebar() {
  return (
    <div
      className="offcanvas sidebar offcanvas-start"
      data-bs-backdrop="false"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Offcanvas
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </div>
        <div className="dropdown mt-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Dropdown button
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="#">
                Action
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
