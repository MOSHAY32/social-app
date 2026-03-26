import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Login from "./pages/LoginPage";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/home"
        element={
          <SignedIn>
            <HomePage />
          </SignedIn>
        }
      />

      <Route
        path="/profile"
        element={
          <SignedIn>
            <Profile />
          </SignedIn>
        }
      />

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