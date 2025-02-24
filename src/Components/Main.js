import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Authorization/Login";
import App from "../App";
import SignPage from "../Components/Authorization/SignIn";

const Main = () => {
  const [authStage, setAuthStage] = useState("signup"); // "signup", "login", or "desk"
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setAuthStage("desk");
    } else {
      setAuthStage("signup");
    }
  }, []);

  const handleSignUpSuccess = () => {
    // After successful sign-up, move to login
    setAuthStage("login");
    navigate("/login", { replace: true });
  };

  const handleLoginSuccess = (token) => {
    if (!token) {
      console.error("No token received in handleLoginSuccess");
      return;
    }

    localStorage.setItem("authToken", token);
    setAuthStage("desk");
    navigate("/courses", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthStage("login");
    navigate("/login", { replace: true });
  };

  if (authStage === "signup") {
    return <SignPage onSignUpSuccess={handleSignUpSuccess} />;
  } else if (authStage === "login") {
    return <Login onLogin={handleLoginSuccess} />;
  } else {
    return <App onLogout={handleLogout} />;
  }
};

export default Main;
