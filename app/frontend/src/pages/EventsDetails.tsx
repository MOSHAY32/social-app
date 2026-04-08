import "./EventsDetails.css";
import defaultImage from "../assets/defualt.jpg";
import React, { useEffect, useState } from "react";
import EventCard from "../componnets/EventCard";
import { getAllEvents } from "../helper";

export default function EventsDetails() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    const currentUserId = "dummy-user-id"; // תחליף בזה את המשתמש הנוכחי שלך
    const _id = "dummy-event-id"; // תחליף בזה את האירוע הרלוונטי
    if (!currentUserId) {
      alert("You must be logged in to register!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: _id, userId: currentUserId, status: "pending" }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error registering");

      alert("You have successfully registered!");
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Failed to register for event: " + (error instanceof Error ? error.message : ""));
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-details-page">

      {/* Section 1: Event Main Info + Description */}
      <section className="event-main-section">
        <div className="container main-div">
          <div className="left-main">
            <h1>Events Details</h1>

            <div className="event-description">
              <h2>Details</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                efficitur, nisl eget consectetur sagittis, nisl nunc consectetur
                nisi, euismod aliquam nisl nunc euismod nisi.
              </p>

              {/* כאן הכנסנו div עוטף לכפתורים */}
              <div className="event-buttons">
              <button className="btn" style={{ width: "100%" }}>Read More</button>                <button className="read-more" onClick={handleRegister} disabled={isRegistered}>
                  {isRegistered ? "Registered" : "Register for Event"}
                </button>
              </div>
            </div>
            
          </div>

          <div className="right-main">
            <img src={defaultImage} alt="event" />
            <div className="event-info">
              <div className="info-item">
                <span className="icon">📅</span>
                <p>Sunday, Apr 19 · 6:00 PM</p>
              </div>
              <div className="info-item">
                <span className="icon">📍</span>
                <p>Tel Aviv</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Explore Events */}
      <section className="explore-events-section">
        <div className="container exsplore-event-container">
          <div className="exsplore-event-header">
            <h2>Explore Events</h2>
          </div>

          {/* div עוטף לכל הכרטיסים */}
          <div className="cards-wrapper" style={{ width: "100%" }}>
            <div className="cards-row">
              {loading ? (
                <p>Loading events...</p>
              ) : events.length === 0 ? (
                <p>No events found.</p>
              ) : (
                events.map((event) => (
                  <EventCard
                    key={event._id}
                    event={{
                      _id: event._id,
                      title: event.name,
                      description: event.description,
                      location: event.place,
                      isFree: event.price === 0,
                      price: event.price,
                      category: event.type,
                      date: event.startDate,
                      author: { _id: event.creatorId, name: "Creator" },
                      urlEvent: event.url && event.url.trim() !== "" ? event.url : "",
                      imageUrl:
                        event.imageUrl && event.imageUrl.trim() !== "" ? event.imageUrl : defaultImage,
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Photos Events */}
      <section className="explore-events-section">
        <div className="container exsplore-event-container">
          <div className="exsplore-event-header">
            <h2>Photos</h2>
          </div>
          {/* <Photos /> */}
        </div>
      </section>

      {/* Section 4: Comments */}
      <section className="explore-events-section">
        <div className="container exsplore-event-container">
          <div className="exsplore-event-header">
            <h2>Comments</h2>
          </div>
          {/* <Comments /> */}
        </div>
      </section>
    </div>
  );
}