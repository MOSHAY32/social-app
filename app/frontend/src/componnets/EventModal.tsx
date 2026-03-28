import React from "react";
import { X } from "lucide-react"; // אייקון X
import "./EventModal.css";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  location: string;
  date: string;
  author: string;
}

const closeModal = () => {
  // Placeholder function for loading state
  alert("Closing modal...");
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  title,
  description,
  location,
  date,
  author,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          <X size={20} />
        </button>
        <h2>{title}</h2>
        <p>{description}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Author:</strong> {author}</p>
      </div>
    </div>
  );
};

export default EventModal;