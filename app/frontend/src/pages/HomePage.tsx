import Navbar from "../componnets/NavBar";
import Search from "../componnets/Search";
import EventCard from "../componnets/EventCard";
import "./Home.css";

const mockEvents = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Event ${i + 1}`,
  description: "This is a sample event description.",
  location: i % 2 === 0 ? "Tel Aviv" : "Jerusalem",
  isFree: i % 3 === 0,
  price: (i + 1) * 10,
  category: i % 2 === 0 ? "Music" : "Art",
  date: "2026-04-10",
  author: "Shay",
  imageUrl: "https://via.placeholder.com/400x150",
}));

export default function HomePage() {
  return (
    <div className="home-container">
      
      {/* Search */}
      <section className="search-container">
        <Search />
      </section>

      {/* Event Cards */}
      <section className="event-wrapper">
        {mockEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </section>
    </div>
  );
}