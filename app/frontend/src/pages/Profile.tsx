import EventCard from "../componnets/EventCard";

import "./Profile.css";

export default function Profile() {
  return (
    <div className="container">
        <div className="profile-header" style={{ padding: "20px" }}>
        <h2>My Tickets</h2>
        <button className="btn">Exsplore More Event</button>

      </div>
      <section className="tickets-section">
        <EventCard />
      </section>

      <div className="myEvent" style={{ padding: "20px" }}>
        <h2>My Events</h2>
        <button className="btn">Create New Event</button>
      <div />

      <section className="events-section">
        {/* Event items would go here */}
      </section>

      

      </div>
    </div>
  );
}