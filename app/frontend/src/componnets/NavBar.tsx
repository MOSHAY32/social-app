import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
        Event Social
      </h2>
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
};

export default Navbar;