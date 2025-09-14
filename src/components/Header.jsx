import { Link } from "react-router-dom";
import icon from "/icon.png"; // adjust path to where your PNG is

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Left side: Brand with Icon */}
        <Link className="navbar-brand fw-bold fs-4 ms-5 d-flex align-items-center" to="/">
          <img 
            src={icon} 
            alt="Logo" 
            style={{ width: "40px", height: "40px", marginRight: "15px", marginTop: "2px" }} 
          />
          FloatChat
        </Link>

        {/* Collapse button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right side: Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/chatbot">
                Chatbot
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


