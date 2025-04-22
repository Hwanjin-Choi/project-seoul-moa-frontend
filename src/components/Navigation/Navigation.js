import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Color } from "../../styles/colorsheet";

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
    max-width: 960px;
  }
  height: 60px;

  background: white;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 50;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? Color.MC1 : Color.BC4)};
  font-size: 10px;
  cursor: pointer;
  padding: 8px 0;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

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
        <FontAwesomeIcon icon={Icons.home} />
        <span>홈</span>
      </NavItem>
      <NavItem
        active={currentPath === "/map"}
        onClick={() => {
          navigate("/map");
        }}
      >
        <FontAwesomeIcon icon={Icons.map} />
        <span>지도</span>
      </NavItem>
      <NavItem
        active={currentPath === "/my-page"}
        onClick={() => {
          navigate("/my-page");
        }}
      >
        <FontAwesomeIcon icon={Icons.user} />
        <span>마이페이지</span>
      </NavItem>
    </NavContainer>
  );
};

export default Navigation;
