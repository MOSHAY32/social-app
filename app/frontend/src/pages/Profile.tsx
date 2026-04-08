import { useEffect, useState } from "react";
import EventCard from "../componnets/EventCard";
import { getAllEvents, fetchMyRegistrations } from "../helper"; 
import defaultImage from "../assets/defualt.jpg";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [registrationsData, eventsData] = await Promise.all([
          fetchMyRegistrations(),
          getAllEvents()
        ]);

        console.debug("registrationsData raw:", registrationsData);
        console.debug("eventsData raw:", eventsData);

        const normalizedRegistrations = Array.isArray(registrationsData)
          ? registrationsData.map((reg) => ({
              eventId: reg.eventId || reg.event_id,
              ...reg
            }))
          : [];

        setMyRegistrations(normalizedRegistrations);
        setAllEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setMyRegistrations([]);
        setAllEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // מסנן את האירועים שלי לפי הרשמות
  useEffect(() => {
    if (!allEvents.length || !myRegistrations.length) {
      setMyEvents([]);
      return;
    }

    const filtered = allEvents.filter((event) =>
      myRegistrations.some((reg) => reg?.eventId && reg.eventId === event._id)
    );

    // יוצרים רשימה בטוחה עם default values כדי שלא תיפול בקומפוננטה
    const safeEvents = filtered.map(event => ({
      _id: event._id || "no-id",
      title: event.name || event.title || "Untitled Event",
      description: event.description || "",
      location: event.place || event.location || "",
      price: event.price ?? 0,
      type: event.type || "general",
      startDate: event.startDate || new Date().toISOString(),
      creatorId: event.creatorId || "unknown",
      url: event.url || "",
      imageUrl: event.imageUrl && event.imageUrl.trim() !== "" ? event.imageUrl : defaultImage,
    }));

    setMyEvents(safeEvents);
  }, [allEvents, myRegistrations]);

  return (
    <div className="container">
      <div className="profile-header" style={{ padding: "20px" }}>
        <h2>My Tickets</h2>
        <button className="btn" onClick={() => navigate("/home")}>
          Explore More Events
        </button>
      </div>

      <section className="tickets-section">
        {loading ? (
          <p>Loading...</p>
        ) : myEvents.length === 0 ? (
          <p>You have no events yet.</p>
        ) : (
          myEvents.map((event) => (
            <EventCard
              key={event._id}
              event={{
                _id: event._id,
                title: event.title,
                description: event.description,
                location: event.location,
                isFree: event.price === 0,
                price: event.price,
                category: event.type,
                date: event.startDate,
                author: { _id: event.creatorId, name: "Creator" },
                urlEvent: event.url,
                imageUrl: event.imageUrl,
              }}
            />
          ))
        )}
      </section>

      <div className="myEvent" style={{ padding: "20px" }}>
        <h2>My Events</h2>
        <button className="btn">Create New Event</button>
      </div>
    </div>
  );
}