import React from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Logo from "./Logo";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        <Logo />
      </div>

      <div className="nav-buttons">
        <SignedOut>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/login")}>Start Free</button>
        </SignedOut>

        <SignedIn>
          
        <div className="nav-links">
          <button className="nav-button" onClick={() => navigate("/home")}>Home</button>
          <button className="nav-button" onClick={() => navigate("/create-event")}>Create Event</button>
          <button className="nav-button" onClick={() => navigate("/profile")}>My Profile</button>
          <button className="nav-button" onClick={() => navigate("/my-orders")}>My Orders</button>
          
        </div>

          <div className="nav-buttons">
          <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        
      </div>
    </nav>
  );
};

export default Navbar;