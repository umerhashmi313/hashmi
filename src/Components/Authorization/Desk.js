import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import App from "../../App";
import SignPage from "./SignIn";

const Main = () => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the auth token from localStorage
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const handleSignUpSuccess = () => {
    // Navigate to the login page after successful sign-up
    navigate("/login", { replace: true });
  };

  const handleLoginSuccess = (token) => {
    if (!token) {
      console.error("No token received in handleLoginSuccess");
      return;
    }

    // Save the auth token and navigate to the main app
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    navigate("/courses", { replace: true });
  };

  const handleLogout = () => {
    // Clear the auth token and navigate back to the sign-up page
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/", { replace: true });
  };

  if (!authToken) {
    // If no auth token is found, decide between SignUp and Login
    if (window.location.pathname === "/login") {
      return <Login onLogin={handleLoginSuccess} />;
    }
    return <SignPage onSignUpSuccess={handleSignUpSuccess} />;
  }

  // If the user is authenticated, render the main app
  return <App onLogout={handleLogout} />;
};

export default Main;
