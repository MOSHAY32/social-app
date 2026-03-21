import app from "./app.js";
import { connectDB } from "./utils/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;  // עכשיו אפשר להשתמש בזה
// Connect to MongoDB first
connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});