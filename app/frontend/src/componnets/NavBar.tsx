// src/components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/home")}>
        <Logo />
      </div>

      <div className="nav-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Start Free</button>
      </div>
    </nav>
  );
};

export default Navbar;