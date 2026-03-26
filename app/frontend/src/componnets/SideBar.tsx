import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h3>Filter Events</h3>
      <div className="filter">
        <label>City:</label>
        <input type="text" placeholder="Tel Aviv" />
      </div>
      <div className="filter">
        <label>Country:</label>
        <input type="text" placeholder="Israel" />
      </div>
    </div>
  );
};

export default Sidebar;