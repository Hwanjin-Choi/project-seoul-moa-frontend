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
    // 전하의 카카오 앱키를 사용하였습니다. 보안상 실제 배포 시에는 환경변수 등으로 관리하시는 것이 안전합니다.
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d653e7eab95357538e15db639e0c9d55&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("Kakao Map loaded");
        setMapLoaded(true);
      });
    };

    // 컴포넌트 언마운트 시 스크립트 태그 제거 (클린업 함수)
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
        {/* 보호된 라우트 */}
        <Route
          path="/my-page"
          element={
            <PrivateRoute>
              <Mypage />
            </PrivateRoute>
          }
        />
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <Map />{" "}
              {/* Map 컴포넌트 자체는 PrivateRoute로 감쌀 필요 없을 수 있음, 내부 기능에 따라 결정 */}
            </PrivateRoute>
          }
        />
        <Route
          path="/view-detail-page"
          element={
            <PrivateRoute>
              <ViewDetail mapReady={mapLoaded} />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-more-page"
          element={
            <PrivateRoute>
              <ViewMorePage />
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
