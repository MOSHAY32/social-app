import React, { useState } from "react";
import EventModal from "./EventModal";
import { FiTrash2, FiEdit } from "react-icons/fi";
import "./EventCard.css";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface Event {
  _id?: string;

  // API format
  name?: string;
  place?: string;
  startDate?: string;
  type?: string;

  // UI format
  title?: string;
  description?: string;
  location?: string;
  category?: string;
  date?: string;

  isFree?: boolean;
  price?: number;

  author?: {
    _id?: string;
    name?: string;
  };

  imageUrl?: string;
}

interface EventCardProps {
  event?: Event;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  if (!event) return null;

  // 🔥 NORMALIZATION LAYER (זה הסוד שמונע באגים)
  const _id = event._id || "";

  const title = event.title || event.name || "Untitled Event";
  const description = event.description || "No description";
  const location = event.location || event.place || "No location";

  const date = event.date || event.startDate || "";

  const category = event.category || event.type || "";

  const price = event.price ?? 0;
  const isFree = event.isFree ?? price === 0;

  const imageUrl = event.imageUrl || "";

  const authorName = event.author?.name || "Unknown";
  const authorId = event.author?._id;

  const currentUserId = user?.id;

  const isCreator =
    !!currentUserId && !!authorId && currentUserId === authorId;

  const formattedDate = date
    ? new Date(date).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="event-card">
        <div className="image-container">
          {imageUrl && (
            <img src={imageUrl} alt={title} className="event-image" />
          )}

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

        <div className="event-content">
          <div className="event-meta">
            <span className="price">{isFree ? "Free" : `$${price}`}</span>
            <span className="category">{category}</span>
          </div>

          <p className="date">{formattedDate}</p>
          <h3>{title}</h3>
          <p className="description">{description}</p>
          <p className="author">By {authorName}</p>
          <p className="location">📍 {location}</p>

          <div className="btns-div">
            <button
              className="read-more"
              onClick={() => navigate(`/events-details/${_id}`)}
            >
              View Event
            </button>
          </div>
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        description={description}
        location={location}
        date={date}
        author={authorName}
        imageUrl={imageUrl}
        price={price}
        category={category}
        eventId={_id}
        isFree={isFree}
      />
    </>
  );
};

export default EventCard;