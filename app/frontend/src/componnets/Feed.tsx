import React, { useState } from "react";
import "./Feed.css";

const postsData = [
  {
    title: "Music Concert",
    description: "Join us for a live concert in the park!",
    location: "Tel Aviv",
  },
  {
    title: "Art Workshop",
    description: "Learn painting techniques with professionals!",
    location: "Jerusalem",
  },
];

const Feed: React.FC = () => {
  return (
    <div className="feed">
      {postsData.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

const Post: React.FC<{ title: string; description: string; location: string }> = ({
  title,
  description,
  location,
}) => {
  const [going, setGoing] = useState(false);

  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{description}</p>
      <p><strong>Location:</strong> {location}</p>
      <div className="post-actions">
        <button onClick={() => setGoing(!going)}>
          {going ? "Going ✅" : "RSVP / Join Event"}
        </button>
        <button>Comment</button>
      </div>
    </div>
  );
};

export default Feed;