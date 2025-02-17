import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import App from "../../App";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("authToken")));
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log("Stored Token:", authToken);
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLogin = (token) => {
    if (!token) {
      console.error("No token received in handleLogin");
      return;
    }
  
    localStorage.setItem("authToken", token);
    console.log("Token Stored:", token);
  
    setIsLoggedIn(true);
    navigate("/courses", { replace: true });
  };
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  if (isLoggedIn === null) {
    return null; // Prevent flashing issue before state is determined
  }

  return isLoggedIn ? <App onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
};

export default Main;
