import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import App from "../../App";      // Regular user app
import App2 from "../../App2";    // Admin app
import SignPage from "./SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [authToken, setAuthToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch token and role from localStorage
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    
    setAuthToken(token);
    setUserRole(role);
  }, []);

  const handleSignUpSuccess = () => {
    navigate("/login", { replace: true });
  };

  const handleLoginSuccess = (token, role) => {
    if (!token) {
      console.error("No token received in handleLoginSuccess");
      return;
    }

    // Save the auth token and role
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);
    setAuthToken(token);
    setUserRole(role);

    // Navigate based on role
    navigate(role === "admin" ? "/admin-dashboard" : "/dashboard", { replace: true });
  };

  const handleLogout = () => {
    // Clear stored credentials
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setAuthToken(null);
    setUserRole(null);
    navigate("/", { replace: true });
  };

  return (
    <>
      <ToastContainer />

      {!authToken ? (
        window.location.pathname === "/login" ? (
          <Login onLogin={handleLoginSuccess} />
        ) : (
          <SignPage onSignUpSuccess={handleSignUpSuccess} />
        )
      ) : userRole === "admin" ? (
        <App2 onLogout={handleLogout} />
      ) : (
        <App onLogout={handleLogout} />
      )}
    </>
  );
};

export default Main;
