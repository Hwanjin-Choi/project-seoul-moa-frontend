import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import DemoPage from "./pages/Demo/DemoPage";
import Mypage from "./pages/Mypage/Mypage.js";
import Map from "./pages/Map/Map.js";
import ViewDetail from "./pages/ViewDetail/ViewDetail.js";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import ViewMorePage from "./pages/ViewMore/ViewMorePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"; // PrivateRoute import
import "./App.css";

const App = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("Kakao Map loaded");
        setMapLoaded(true);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
        <Route path="/demo-page" element={<DemoPage />} />
        <Route path="/" element={<DemoPage />} /> {/* 기본 경로도 DemoPage로 */}
        <Route path="/map" element={<Map mapReady={mapLoaded} />} />
        <Route
          path="/view-detail-page/:eventId"
          element={<ViewDetail mapReady={mapLoaded} />}
        />
        <Route path="/view-more-page" element={<ViewMorePage />} />
        {/* 보호된 라우트 */}
        <Route
          path="/my-page"
          element={
            <PrivateRoute>
              <Mypage />
            </PrivateRoute>
          }
        />
        {/* 404 Not Found 라우트 (필요시 추가) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
