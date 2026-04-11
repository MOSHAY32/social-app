import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import "./AddComment.css";

export default function AddComment({ eventId }) {
  const [text, setText] = useState("");

  const { user, isLoaded } = useUser();

  const handleSubmitComment = async (e) => {
    e.preventDefault();


    if (!isLoaded || !user) {
      console.error("User not loaded yet");
      return;
    }

    if (!eventId) {
      console.error("Missing eventId from URL");
      return;
    }

    if (!text.trim()) {
      console.error("Empty comment");
      return;
    }

    const payload = {
      text,
      eventId,
      userId: user.id,
      userName: user.fullName || user.username || "Unknown User",
      userImage: user.imageUrl,
    };

    console.log("Sending payload:", payload);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit comment");
      }

      console.log("Comment created:", data);

      setText("");
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  return (
    <form className="input-wrapper" onSubmit={handleSubmitComment}>
      <input
        className="comment-input"
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="comment-submit" type="submit">
        Submit
      </button>
    </form>
  );
}