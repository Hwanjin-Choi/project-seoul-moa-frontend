import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import DemoPage from "./pages/Demo/DemoPage";
import Mypage from "./pages/Mypage/Mypage.js";
import Map from "./pages/Map/Map.js";
import ViewDetail from "./pages/ViewDetail/ViewDetail.js";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import ViewMorePage from "./pages/ViewMore/ViewMorePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivateRedirectionModal from "./components/PrivateRoute/PrivateRedirectionModal"; // 전하의 모달 컴포넌트
import "./App.css";

function AppInternal() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("Kakao Map loaded");
        setMapLoaded(true);
      });
    };

    return () => {
      const existingScript = document.querySelector(
        `script[src*="${process.env.REACT_APP_KAKAO_MAP_KEY}"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("show_session_expired_modal") === "true") {
      setIsModalOpen(true);
    }
  }, [location.search]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    const params = new URLSearchParams(location.search);
    params.delete("show_session_expired_modal");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleConfirmAndRedirectToLogin = () => {
    setIsModalOpen(false);
    const params = new URLSearchParams(location.search);
    params.delete("show_session_expired_modal");
  };

  return (
    <>
      <PrivateRedirectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAndRedirectToLogin}
        message={"세션이 만료되었습니다 \n 다시 로그인 해주세요"}
      />
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/registration-page" element={<RegistrationPage />} />
        <Route path="/demo-page" element={<DemoPage />} />
        <Route path="/" element={<DemoPage />} />
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
    </>
  );
}

const App = () => {
  return (
    <Router>
      <AppInternal />
    </Router>
  );
};

export default App;
