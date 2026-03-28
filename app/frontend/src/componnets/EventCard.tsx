import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import EventModal from "./EventModal";
import "./EventCard.css";

interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  isFree: boolean;
  price?: number;
  category: string;
  date: string;
  author: {
    _id: string;
    name: string;
  };
  imageUrl?: string;
}

interface EventCardProps {
  event?: Event;
  onDelete?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!event) {
    // Placeholder עבור Loading
    return (
      <div className="event-card placeholder">
        <div className="image-container">
          <div className="event-image skeleton"></div>
        </div>
        <div className="event-content">
          <div className="event-meta">
            <span className="price skeleton-text"></span>
            <span className="category skeleton-text"></span>
          </div>
          <p className="date skeleton-text"></p>
          <h3 className="skeleton-text">Loading...</h3>
          <p className="description skeleton-text"></p>
          <p className="author skeleton-text"></p>
          <p className="location skeleton-text"></p>
          <button
            className="read-more skeleton-button"
            onClick={() => alert("Loading event details...")}
          >
            Loading
          </button>
        </div>
      </div>
    );
  }

  const { _id, title, description, location, isFree, price, category, date, author, imageUrl } = event;

  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* הכרטיס עצמו – כל הלחיצה עליו פותחת Modal */}
      <div className="event-card" onClick={openModal}>
        {/* IMAGE */}
        <div className="image-container">
          <img src={imageUrl || "/fallback.jpg"} alt={title} className="event-image" />
          {onDelete && (
            <div
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation(); // חשוב – מונע פתיחת modal כשלוחצים על המחיקה
                onDelete(_id);
              }}
            >
              <Trash2 size={18} />
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="event-content">
          <div className="event-meta">
            <span className="price">{isFree ? "Free" : `$${price}`}</span>
            <span className="category">{category}</span>
          </div>

          <p className="date">{formattedDate}</p>
          <h3>{title}</h3>
          <p className="description">{description}</p>
          <p className="author">By {author.name}</p>
          <p className="location">📍 {location}</p>

          <button
            className="read-more"
            onClick={(e) => {
              e.stopPropagation(); // עצור את הפצת הלחיצה
              openModal(); // פתיחת modal גם כאן
            }}
          >
            View Event
          </button>
        </div>
      </div>

      {/* Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        description={description}
        location={location}
        date={formattedDate}
        author={author.name}
        imageUrl={imageUrl}
      />
    </>
  );
};

export default EventCard;