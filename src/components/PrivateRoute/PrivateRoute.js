import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PrivateRedirectionModal from "./PrivateRedirectionModal"; // 방금 만든 Modal 컴포넌트 import

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // localStorage에서 로그인 상태 확인
  const [isModalOpen, setIsModalOpen] = useState(!isLoggedIn); // 로그인 안됐으면 모달 상태 true
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // 모달 닫기 후 로그인 페이지로 이동하거나 다른 작업 수행 가능
    // navigate('/login-page'); // 예를 들어 로그인 페이지로 리디렉션
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate("/login-page"); // 확인 버튼 클릭 시 로그인 페이지로 이동
  };

  if (isLoggedIn) {
    return children; // 로그인 상태면 자식 컴포넌트 렌더링
  } else {
    // 로그인 상태가 아니면 모달 렌더링
    return (
      <PrivateRedirectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // 닫기 함수 연결 (현재는 사용 안 함)
        onConfirm={handleConfirm} // 확인 함수 연결
        message="로그인 후 사용해주세요"
      />
    );
    // 또는 로그인 페이지로 바로 리디렉션할 수도 있습니다:
    // return <Navigate to="/login-page" replace />;
  }
};

export default PrivateRoute;
