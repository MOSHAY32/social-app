import Navbar from "./NavBar";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import "./Layout.css"; // אם יש לך CSS מותאם
import { div } from "framer-motion/m";

export default function Layout() {
  return (
    <div className="layout-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar תמיד למעלה */}
      <header>
        <Navbar />
      </header>
s        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet /> {/* כאן ירנדרו כל הדפים: HomePage / Profile / CreateEvent */}
        </main>
      </div>
  );
}