import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import DemoPage from "./pages/Demo/DemoPage";
import "./App.css";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import ViewMorePage from "./pages/ViewMore/ViewMorePage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
        <Route path="/demo-page" element={<DemoPage />} />
        <Route path="/view-more-page" element={<ViewMorePage />} />
        <Route path="/" element={<DemoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
