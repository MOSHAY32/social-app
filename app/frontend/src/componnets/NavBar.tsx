import React from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Logo from "./Logo";
import "./Navbar.css";
import Search from "./Search";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      {/* צד שמאל */}
      <div className="nav-left">
        <Logo />
        <Search />
      </div>

      <div className="nav-right">

        <SignedOut>
          <button class="btn-navbar" onClick={() => navigate("/login") }>Login</button>
          <button className="btn-navbar" onClick={() => navigate("/login")}>Start Free</button>
        </SignedOut>

        <SignedIn>
          <div className="nav-links">
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/create-event")}>Create Event</button>
            <button onClick={() => navigate("/profile")}>My Profile</button>
            <button onClick={() => navigate("/my-orders")}>My Orders</button>
          </div>

          <UserButton afterSignOutUrl="/" />
        </SignedIn>

      </div>

    </nav>
  );
};

export default Navbar;