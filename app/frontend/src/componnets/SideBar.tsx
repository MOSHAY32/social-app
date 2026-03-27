import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>EventSocial</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>Create Event</li>
          <li>Most Popular</li>
          <li>Profile</li>
          <li>My Ticket</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;