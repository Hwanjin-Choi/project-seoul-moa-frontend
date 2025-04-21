import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 1024px) {
    // Optional: Adjust for larger screens
    max-width: 960px; // Set another width if needed
  }
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 1000;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? "#7B61FF" : "#666")};
  font-size: 12px;
  cursor: pointer;
  padding: 8px 0;
  gap: 4px;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

const HomeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2L1 12h3v9h7v-6h2v6h7v-9h3L12 2zm0 2.41L20.59 12H19v8h-5v-6H10v6H5v-8H3.41L12 4.41z" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavContainer>
      <NavItem
        active={currentPath === "/"}
        onClick={() => {
          navigate("/");
        }}
      >
        <HomeIcon />
        <span>홈</span>
      </NavItem>
      <NavItem
        active={currentPath === "/map"}
        onClick={() => {
          navigate("/map");
        }}
      >
        <MapIcon />
        <span>지도</span>
      </NavItem>
      <NavItem
        active={currentPath === "/my-page"}
        onClick={() => {
          navigate("/my-page");
        }}
      >
        <ProfileIcon />
        <span>마이페이지</span>
      </NavItem>
    </NavContainer>
  );
};

export default Navigation;
