import React from "react";
import { X, Calendar } from "lucide-react";
import "./EventModal.css";
import { useNavigate } from "react-router-dom";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  location: string;
  date: string;
  endDate?: string;
  author: string;
  imageUrl?: string;
  isFree: boolean;
  price?: number;
  category: string;
  eventId: string;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  location,
  date,
  endDate,
  author,
  imageUrl,
  isFree,
  price,
  category,
  eventId,
}) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedStartTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndTime = endDate
    ? new Date(endDate).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const handlePayment = () => {
    navigate("/payments");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div
          className="modal-left"
          onClick={() => navigate(`/events-details/${eventId}`)}
          style={{ cursor: "pointer" }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt={title} />
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>

        <div className="modal-right">
          <h2 className="event-title">{title}</h2>

          <div className="event-info">
            <span className={`price ${isFree ? "free" : "paid"}`}>
              {isFree ? "Free" : `$${price}`}
            </span>
            <span className="category">{category}</span>
            <span className="author">By {author}</span>
          </div>

          <button className="btn" onClick={handlePayment}>
            Get Ticket
          </button>

          <div className="event-details">
            <div className="date-time">
              <Calendar size={18} />
              {formattedDate} | {formattedStartTime}
              {formattedEndTime ? ` - ${formattedEndTime}` : ""}
            </div>
            <div className="location">📍 {location}</div>
          </div>

          <h3>What You'll Learn</h3>
          <p className="event-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventModal;