import { useEffect, useState } from "react";
import Search from "../componnets/Search";
import EventCard from "../componnets/EventCard";
import defaultImage from "../assets/defualt.jpg";
import "./Home.css";

export default function HomePage() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);

  const EVENTS_PER_PAGE = 6;

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

  const startIndex = page * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;

  const visibleEvents = events.slice(startIndex, endIndex);

  const nextPage = () => {
    if (endIndex < events.length) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

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

          : visibleEvents.map((event) => (

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
                  event.imageUrl && event.imageUrl.trim() !== ""
                    ? event.imageUrl
                    : defaultImage,
              }}
            />

          ))}
      </section>

      {/* Pagination */}
      <div className="btns-home">

        <button
          className="btns"
          onClick={prevPage}
          disabled={page === 0}
        >
          Prev
        </button>

        <button
          className="btns"
          onClick={nextPage}
          disabled={endIndex >= events.length}
        >
          Next
        </button>

      </div>

    </div>
  );
}