import "./EventsDetails.css";
import defaultImage from "../assets/defualt.jpg";
import React, { useEffect, useState } from "react";
import EventCard from "../componnets/EventCard";
import Comments from "../componnets/Comment";
import { getAllEvents } from "../helper";
import { useUser } from "@clerk/clerk-react";

export default function EventsDetails() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const { user } = useUser();
  const currentUserId = user?.id;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData || []);

        if (eventsData?.length > 0) {
          setSelectedEvent(eventsData[0]);
        }

      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async () => {
    if (!currentUserId) {
      alert("You must be logged in to register!");
      return;
    }

    if (!selectedEvent) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/registrations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: selectedEvent._id,
            userId: currentUserId,
            status: "pending",
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("You have successfully registered!");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!selectedEvent) return <p>No event selected</p>;

  return (
    <div className="events-details-page">

      {/* EVENT DETAILS */}
      <section className="event-main-section">
        <div className="container main-div">

          <div className="left-main">
            <h1>{selectedEvent.name}</h1>

            <div className="event-description">
              <h2>Details</h2>

              <p>
                {selectedEvent.description || "No description available"}
              </p>

              <div className="event-buttons">
                <button className="btn" style={{ width: "100%" }}>
                  Read More
                </button>

                <button className="read-more" onClick={handleRegister}>
                  Register for Event
                </button>
              </div>
            </div>
          </div>

          <div className="right-main">
            <img
              src={selectedEvent.imageUrl || defaultImage}
              alt="event"
            />

            <div className="event-info">
              <div className="info-item">
                <span className="icon">📅</span>
                <p>{selectedEvent.startDate || "No date"}</p>
              </div>

              <div className="info-item">
                <span className="icon">📍</span>
                <p>{selectedEvent.place || "No location"}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EVENTS LIST */}
      <section className="explore-events-section">
        <div className="container exsplore-event-container">

          <h2>Explore Events</h2>

          <div className="cards-row">
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => setSelectedEvent(event)}
              >
                <EventCard
                  event={{
                    _id: event._id,
                    title: event.name,
                    description: event.description,
                    location: event.place,
                    price: event.price,
                    category: event.type,
                    date: event.startDate,
                    imageUrl: event.imageUrl || defaultImage,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENTS */}
      <section>
        <div className="container">
          <h2>Comments</h2>

          <Comments eventId={selectedEvent._id} />
        </div>
      </section>

    </div>
  );
}