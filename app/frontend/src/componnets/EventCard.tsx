import React, { useState } from "react";
import EventModal from "./EventModal";
import { FiTrash2, FiEdit } from "react-icons/fi";
import "./EventCard.css";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; // <-- כאן אנחנו מקבלים את המשתמש המחובר

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
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();
  const currentUserId = user?.id; // <-- זה ייתן את ה־userId

  if (!event) return <div>Loading...</div>;

  const { _id, title, description, location, isFree, price, category, date, author, imageUrl } = event;
  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isCreator = currentUserId === author._id;



  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="event-card">
        <div className="image-container">
          {imageUrl && <img src={imageUrl} alt={title} className="event-image" />}
          {isCreator && (
            <div className="card-icons">
              {onEdit && <FiEdit className="icon edit-icon" onClick={(e) => { e.stopPropagation(); onEdit(_id); }} />}
              {onDelete && <FiTrash2 className="icon delete-icon" onClick={(e) => { e.stopPropagation(); onDelete(_id); }} />}
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
          <p className="author">By {author.name}</p>
          <p className="location">📍 {location}</p>

          <div className="btns-div">
            <button className="read-more" onClick={() => navigate(`/events-details`)}>
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
        date={formattedDate}
        author={author.name}
        imageUrl={imageUrl}
        price={price}
        authorId={author._id}
        category={category}
      />
    </>
  );
};

export default EventCard;