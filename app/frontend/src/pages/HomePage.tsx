import { useEffect, useState } from "react";
import Navbar from "../componnets/NavBar";
import Search from "../componnets/Search";
import EventCard from "../componnets/EventCard";
import defaultImage from "../assets/defualt.jpg"
import "./Home.css";

export default function HomePage() {
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const getAllEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
      if (!response.ok) {
        console.error("Fetch failed:", response.status, await response.text());
        setLoading(false);
        return;
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="home-container">
      {/* Search */}
      <section className="search-container">
        <Search />
      </section>

      {/* Event Cards */}
      <section className="event-wrapper">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <EventCard key={i} />) 
          : events.map((event) => (
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
                  imageUrl: event.imageUrl && event.imageUrl.trim() !== "" ? event.imageUrl: defaultImage,
                }}
              />
            ))}
      </section>
    </div>
  );
}