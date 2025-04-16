import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import DemoPage from "./pages/Demo/DemoPage";
import Mypage from "./pages/Mypage/Mypage.js";
import Map from "./pages/Map/Map.js";
import "./App.css";
import RegistrationPage from "./pages/Registration/RegistrationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
        <Route path="/demo-page" element={<DemoPage />} />
        <Route path="/my-page" element={<Mypage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/" element={<DemoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
