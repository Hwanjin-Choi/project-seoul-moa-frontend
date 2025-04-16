import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Color } from '../../styles/colorsheet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from "../../assets/icons";

const LayoutWrapper = styled.div`
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
  }

  position: relative;
  padding-bottom: 60px;
  background: white;
`;

const Content = styled.div``;

const Navigation = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
  }
  height: 70px;
  background: white;
  
  display: flex;
  align-items: center;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? Color.MC1 : Color.BC4)};
  font-weight: bold;
  font-size: 12px;
  gap: 3px;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

const MobileLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (location.pathname === "/") setActiveTab("home");
    else if (location.pathname === "/map") setActiveTab("map");
    else if (location.pathname === "/my-page") setActiveTab("profile");
  }, [location.pathname]);

  return (
    <LayoutWrapper>
      <Content>{children}</Content>
      <Navigation>
        <NavItem
          active={activeTab === "home"}
          onClick={() => {
            setActiveTab("home");
            navigate("/");
          }}
        >
          <FontAwesomeIcon icon={Icons.home} />
          <span>홈</span>
        </NavItem>

        <NavItem
          active={activeTab === "map"}
          onClick={() => {
            setActiveTab("map");
            navigate("/map");
          }}
        >
          <FontAwesomeIcon icon={Icons.map} />
          <span>지도</span>
        </NavItem>

        <NavItem
          active={activeTab === "profile"}
          onClick={() => {
            setActiveTab("profile");
            navigate("/my-page");
          }}
        >
           <FontAwesomeIcon icon={Icons.user} />
          <span>마이페이지</span>
        </NavItem>
      </Navigation>
    </LayoutWrapper>
  );
};

export default MobileLayout;
