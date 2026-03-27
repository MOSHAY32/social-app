import React from "react";
import { Trash2 } from "lucide-react";
import "./EventCard.css";

interface EventCardProps {
  title?: string;
  description?: string;
  location?: string;
  isFree?: boolean;
  price?: number;
  category?: string;
  date?: string;
  author?: string;
  imageUrl?: string;
  onDelete?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title = "Sample Event",
  description = "This is a sample event description.",
  location = "Tel Aviv",
  isFree = true,
  price = 0,
  category = "Music",
  date = "2026-04-10",
  author = "Shay",
  imageUrl = "https://via.placeholder.com/400x150",
  onDelete,
}) => {
  return (
    <div className="event-card">
      {/* Delete Icon */}
      {onDelete && (
        <div className="delete-icon" onClick={onDelete}>
          <Trash2 size={18} />
        </div>
      )}

      {/* Image */}
      <img src={imageUrl} alt={title} className="event-image" />

      {/* Title */}
      <h3>{title}</h3>

      {/* Price + Category */}
      <div className="event-meta">
        <span className="price">{isFree ? "Free" : `$${price}`}</span>
        <span className="category">{category}</span>
      </div>

      {/* Date */}
      <p className="date">{date}</p>

      {/* Description */}
      <p className="description">{description}</p>

      {/* Author */}
      <p className="author">Created by: {author}</p>

      {/* Location */}
      <p className="location">Location: {location}</p>

       {/* Read More Button */}
      <button className="read-more">Read More</button>
    </div>
  );
};

export default EventCard;