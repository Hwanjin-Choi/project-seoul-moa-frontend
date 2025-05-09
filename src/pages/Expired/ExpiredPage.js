import React, { useState, useEffect } from "react";
import PrivateRedirectionModal from "../../components/PrivateRoute/PrivateRedirectionModal";
import MobileLayout from "../../components/Layout/MobileLayout";
import { useNavigate } from "react-router-dom";

const ExpiredPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;
  useEffect(() => {
    if (localStorage.getItem("show_session_expired_modal") === "true") {
      setIsModalOpen(true);
    }
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
    localStorage.removeItem("isLoggedIn");

    navigate("/login-page");
  };

  const handleConfirmAndRedirectToLogin = () => {
    setIsModalOpen(false);
    localStorage.removeItem("show_session_expired_modal");
    localStorage.removeItem("isLoggedIn");
    navigate("/login-page");
  };
  return (
    <MobileLayout>
      <PrivateRedirectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAndRedirectToLogin}
        message={
          isLoggedIn
            ? "세션이 만료되었습니다\n로그인 후 사용해주세요"
            : "로그인이 필요합니다"
        }
      />
    </MobileLayout>
  );
};

export default ExpiredPage;
