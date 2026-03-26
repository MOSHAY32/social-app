import Navbar from "../componnets/NavBar";

import Sidebar from "../componnets/SideBar";
import Feed from "../componnets/Feed";
import "./Home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <div className="home-header">
        <h2>Welcome to Event Social!</h2>
        <p>Discover events happening around you</p>
      </div>

      {/* Layout */}
      <div className="layout">
        <Sidebar />

        <Feed />
      </div>
    </div>
  );
}