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
        {/* אם המשתמש לא מחובר */}
        <SignedOut>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/login")}>Start Free</button>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/login" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;