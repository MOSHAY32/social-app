import defaultImage from "../assets/defualt.jpg";
import "./CommentSection.css";

export default function CommentSection({ eventId }: { eventId: string }) {
  return (
    <div className="comment-section">
    <div className="comment-card">
  <img src={defaultImage} className="img-user" />

  <div className="comment-body">
    <h4>User Name</h4>
    <p style={{ marginTop: '10px' }}>This is where the comments will be displayed.</p>
    <button className="btn-like" style={{ marginTop: '10px' }}>  ❤️ Like</button>
  </div>
</div>
    </div>
  );
}