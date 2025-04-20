import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import DemoPage from "./pages/Demo/DemoPage";
import Mypage from "./pages/Mypage/Mypage.js";
import Map from "./pages/Map/Map.js";
import ViewDetail from "./pages/ViewDetail/ViewDetail.js";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import ViewMorePage from "./pages/ViewMore/ViewMorePage";
import "./App.css";
const App = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d653e7eab95357538e15db639e0c9d55&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("Kakao Map loaded");
        setMapLoaded(true);
      });
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
        <Route path="/demo-page" element={<DemoPage />} />
        <Route path="/my-page" element={<Mypage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/viewdetail-page" element={<ViewDetail mapReady={mapLoaded} />} />
        <Route path="/view-more-page" element={<ViewMorePage />} />
        <Route path="/" element={<DemoPage />} />
      </Routes>
    </Router>
  );
};

export default App;