import React, { useState, useEffect } from "react";
import PrivateRedirectionModal from "../../components/PrivateRoute/PrivateRedirectionModal";
import MobileLayout from "../../components/Layout/MobileLayout";
import { useNavigate } from "react-router-dom";

const ExpiredPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("show_session_expired_modal") === "true") {
      setIsModalOpen(true);
    }
    // storage 이벤트 리스너 함수
    const handleStorageChange = (event) => {
      if (
        event.storageArea === localStorage &&
        event.key === "show_session_expired_modal"
      ) {
        if (event.newValue === "true") {
          setIsModalOpen(true);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setIsModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    localStorage.removeItem("show_session_expired_modal");
    navigate("/login-page");
  };

  const handleConfirmAndRedirectToLogin = () => {
    setIsModalOpen(false);
    localStorage.removeItem("show_session_expired_modal");
    navigate("/login-page");
  };
  return (
    <MobileLayout>
      <PrivateRedirectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAndRedirectToLogin}
        message={"로그인이 만료 되었거나\n로그인 후 사용해주세요"}
      />
    </MobileLayout>
  );
};

export default ExpiredPage;
