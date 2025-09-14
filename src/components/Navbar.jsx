import React from "react";
import logo from "/logo1.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4">
      <a className="navbar-brand d-flex align-items-center" href="#">
        <img src={logo} alt="logo" width="40" height="40" className="me-2" />
        <span style={{ color: "white", fontWeight: "bold" }}>FloatChat</span>
      </a>
      <div className="ms-auto d-flex gap-3">
        <a className="nav-link text-light" href="#">Home</a>
        <a className="nav-link active" href="#">Chat</a>
        <a className="nav-link text-light" href="#">Dashboard</a>
        <a className="nav-link text-light" href="#"></a>
      </div>
    </nav>
  );
}

export default Navbar;
