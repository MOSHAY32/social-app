import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Login from "./pages/LoginPage";
import CreateEvent from "./pages/CreateEvent";
import Layout from "./componnets/Layout";
import MyOrders from "./pages/MyOrders";
import Payments from "./pages/Payments"
import EventsDetails from "./pages/EventsDetails";

import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        element={
          <SignedIn>
            <Layout />
          </SignedIn>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/events-details" element={<EventsDetails />} />

      </Route>

      {/* Login */}
      <Route
        path="/login"
        element={
          <>
            <SignedOut>
              <Login />
            </SignedOut>

            <SignedIn>
              <Navigate to="/home" />
            </SignedIn>
          </>
        }
      />
    </Routes>
  );
}

export default App;