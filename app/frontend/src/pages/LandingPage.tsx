// src/pages/LandingPage.tsx
import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../componnets/NavBar";
import EventCard from "../componnets/EventCard";
import { getAllEvents } from "../helper";
import "./Profile.css";
import defaultImage from "../assets/defualt.jpg";

const EVENTS_PER_PAGE = 6;

export default function LandingPage() {
  const navigate = useNavigate();

  const people = [
    { cx: 70, cy: 200, color: "#7c3aed" },
    { cx: 150, cy: 180, color: "#a78bfa" },
    { cx: 230, cy: 210, color: "#7c3aed" },
    { cx: 310, cy: 190, color: "#a78bfa" },
  ];

  const lines = [
    { x1: 70, y1: 200, x2: 150, y2: 180, color: "#a78bfa", delay: 0 },
    { x1: 150, y1: 180, x2: 230, y2: 210, color: "#7c3aed", delay: 0.3 },
    { x1: 230, y1: 210, x2: 310, y2: 190, color: "#a78bfa", delay: 0.6 },
  ];

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [myTickets, setMyTickets] = useState([]);
  

  const visibleEvents = events.slice(0, EVENTS_PER_PAGE);

 useEffect(() => {
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getAllEvents();
      setEvents(eventsData || []);
      setMyTickets(
        (eventsData || []).map((event: any) => ({
          ...event,
          isFree: event.price === 0,
          category: event.type,
          date: event.startDate,
          author: { _id: event.creatorId, name: event.creatorName },
          urlEvent: event.url,
          imageUrl: event.imageUrl?.trim() ? event.imageUrl : defaultImage,
        }))
      );
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);

  return (
    <div className="landing">
      <Navbar />

      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Discover Events. Meet People.</h1>
          <p>Join amazing events and connect with your community easily.</p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/login")}>Start Free</button>
            <button>Learn More</button>
          </div>
        </motion.div>

        <motion.div
          className="hero-illustration"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <svg width="400" height="300" viewBox="0 0 400 300">
            {people.map((person, i) => (
              <motion.circle
                key={i}
                cx={person.cx}
                cy={person.cy}
                r={30}
                fill={person.color}
                animate={{ cy: [person.cy, person.cy - 15, person.cy] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
              />
            ))}

            {lines.map((line, i) => (
              <motion.line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: line.delay }}
              />
            ))}
          </svg>
        </motion.div>
      </section>

      <div className="container">
      {/* ===================== My Tickets ===================== */}
      <div className="profile-header" style={{ padding: "20px" }}>
        <h2>Events</h2>
        <button className="btn" onClick={() => navigate("/login")}>
          Explore More Events
        </button>
      </div>

      <section className="tickets-section">
        {loading ? (
          <p>Loading...</p>
        ) : myTickets.length === 0 ? (
          <p>You have no tickets yet.</p>
        ) : (
          myTickets.map((event) => (
            <EventCard
              key={event._id}
              event={{
                ...event,
                isFree: event.price === 0,
                category: event.type,
                date: event.startDate,
                author: { _id: event.creatorId, name: event.creatorName },
                urlEvent: event.url,
              }}
            />
          ))
        )}
      </section>
      </div>
    </div>
  );
}