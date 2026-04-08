

// src/api/helper.tsx
export const getAllEvents = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return await res.json();
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
};


 export const fetchMyRegistrations = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/registrations`,
          { headers: { "Content-Type": "application/json" } }
        );
        if (!response.ok) throw new Error("Failed to fetch registrations");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };