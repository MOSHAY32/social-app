import React, { useState } from "react";
import EventModal from "./EventModal";
import { FiTrash2, FiEdit } from "react-icons/fi"; // אייקוני מחיקה ועריכה
import "./EventCard.css";
import { PricingTable } from "@clerk/clerk-react";

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
  urlEvent?: string;
}

interface EventCardProps {
  event?: Event;
  currentUserId?: string; 
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, currentUserId, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!event) {
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
          <button className="read-more skeleton-button">Loading</button>
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

  const isCreator = currentUserId === author._id;

  return (
    <>
      <div className="event-card" onClick={openModal}>
        {/* IMAGE */}
        <div className="image-container">
          <img src={imageUrl} alt={title} className="event-image" />

          {isCreator && (
            <div className="card-icons">
              {onEdit && (
                <FiEdit
                  className="icon edit-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(_id);
                  }}
                />
              )}
              {onDelete && (
                <FiTrash2
                  className="icon delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(_id);
                  }}
                />
              )}
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
              e.stopPropagation();
              openModal();
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
        price={price}
        author={author._id}
        category={category}
      />
    </>
  );
};

export default EventCard;