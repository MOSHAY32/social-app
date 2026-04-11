import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import "./CreateEvent.css";

function CreateEventPage() {
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState({
    eventName: "",
    category: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    price: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!isLoaded || !user) {
      console.log("User not loaded yet");
    
    }

   
    const eventData = {
      creatorId: user.id, 
      name: formData.eventName,
      type: formData.category,
      description: formData.description,
      place: formData.location,
      startDate: formData.startDate ? new Date(formData.startDate) : null,
      endDate: formData.endDate ? new Date(formData.endDate) : null,
      price: formData.price ? Number(formData.price) : 0,
      url: formData.url || "",
    };

    console.log("Submitting event:", eventData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok) {
        console.log("Event created successfully!");
        // איפוס הטופס
        setFormData({
          eventName: "",
          category: "",
          description: "",
          location: "",
          startDate: "",
          endDate: "",
          price: "",
          url: "",
        });
      } else {
        console.error("Error creating event:", data.message);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  if (!isLoaded || !user) return <div>Loading user...</div>;

  return (
    <div className="create-continer">
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="inputs-conteiner">
          <input
            className="inputs-btns"
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleChange}
          />
          <input
            className="inputs-btns"
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            className="inputs-text-area full-width"
            type="text"
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
          />
          
          <input
            className="inputs-location full-width"
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            className="inputs-location"
            type="text"
            name="startDate"
            placeholder="Start Date"
            value={formData.startDate}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => e.target.value === "" && (e.target.type = "text")}
            onChange={handleChange}
          />
          <input
            className="inputs-location"
            type="text"
            name="endDate"
            placeholder="End Date"
            value={formData.endDate}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => e.target.value === "" && (e.target.type = "text")}
            onChange={handleChange}
          />
          <input
            className="inputs-btns"
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            className="inputs-btns"
            type="text"
            name="url"
            placeholder="Url"
            value={formData.url}
            onChange={handleChange}
          />
          <button className="inputs-btns1 submit-btn" type="submit">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEventPage;