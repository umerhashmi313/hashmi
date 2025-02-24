import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignPage from "./Components//Authorization/SignIn";
import Login from "./Components/Authorization/Login";
import Main from "./Components/Authorization/Desk";

const App = () => {
  return (

      <Routes>
        <Route path="/signup" element={<SignPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    
  );
};

export default App;
