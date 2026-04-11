import React from 'react';
import CommentSection from './CommentSection';
import AddComment from './AddComment';

export default function Comments({ eventId }) {
  if (!eventId) return null;

  return (
    <div className="comments-section">
      <AddComment eventId={eventId} />
      <CommentSection eventId={eventId} />
    </div>
  );
}