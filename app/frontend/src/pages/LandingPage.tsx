// src/pages/LandingPage.tsx
import React from "react";
import "./LandingPage.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../componnets/NavBar";





export default function LandingPage() {
  const navigate = useNavigate();

  // נתוני האנשים ל־Hero
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

  return (
    <div className="landing">
      <Navbar />

      {/* Hero Section */}
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

        {/* Hero Illustration עם אנימציה */}
        <motion.div
          className="hero-illustration"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            {/* דמויות עם אנימציה של קפיצה */}
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

            {/* קווים שמתחברים בהדרגה */}
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

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Why Together?</h2>
        <p>Everything you need to manage and join events efficiently.</p>
        <div className="features-cards">
          {[
            { icon: "🎉", title: "Find Events", desc: "Discover local events that interest you." },
            { icon: "🤝", title: "Meet People", desc: "Connect with like-minded attendees easily." },
            { icon: "📅", title: "Plan Your Day", desc: "Organize your schedule and never miss an event." },
          ].map((feature, i) => (
            <motion.div whileHover={{ scale: 1.05 }} className="card" key={i}>
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to join?</h2>
        <button onClick={() => navigate("/signup")}>Start Free Now</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <h3>Together</h3>
          <p>&copy; 2026 Together. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}