import Navbar from "../componnets/NavBar";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="container">
        <Navbar />
        <div style={{ padding: "20px" }}>
        <h2>Your Profile</h2>
      </div>
      <div className="profile-card">
        <h2>Your Profile</h2>
        <p>Name: User</p>
        <button className="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  );
}