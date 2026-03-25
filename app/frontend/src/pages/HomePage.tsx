import Navbar from "../componnets/NavBar";
import "./Home.css";

export default function HomePage() {
  return (
    <div>
      <div className="navbar">Event Social
          <Navbar />
          <div style={{ padding: "20px" }}>
        <h2>Welcome to the Home Feed!</h2>
      </div>
      <div className="layout">
        <div className="sidebar">Sidebar</div>

        <div className="feed">
          <div className="card">Post / Event 1</div>
          <div className="card">Post / Event 2</div>
        </div>

        <div className="sidebar">Suggestions</div>
      </div>
    </div>
  </div>
  );
}