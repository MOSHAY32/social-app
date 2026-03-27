import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate(); // <-- חייבים להגדיר את זה כאן

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>EventSocial</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li onClick={() => navigate("/home")}>All Events</li>
          <li onClick={() => navigate("/create-event")}>Create Event</li>
          <li onClick={() => navigate("/most-popular")}>Most Popular</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/my-ticket")}>My Ticket</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;