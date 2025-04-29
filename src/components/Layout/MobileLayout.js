import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import BackHeader from "../BackHeader/BackHeader";
import logo from "../../assets/seoulmoa.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Color } from "../../styles/colorsheet";

const LayoutWrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
  }
  width: 100%;
  height: 100vh;
  position: relative;
  background: linear-gradient(to bottom, #fff, ${Color.MC4});
  overflow: hidden;
`;

const Content = styled.div`
  height: calc(100vh - 57px);
  overflow-y: auto;
  padding: 0 0 60px 0px;
  @media (max-width: 768px) {
    padding: 0px 0px 60px 0px;
  }
`;

const NavigationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
const Logo = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 20px;
  cursor: pointer;
`;
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Header = styled.header`
  background-color: white;
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const MobileLayout = ({ children }) => {
  const location = useLocation();
  const isDefaultPage = location.pathname === "/";
  const navigate = useNavigate();
  return (
    <LayoutWrapper>
      {isDefaultPage ? (
        <Header onClick={() => navigate("/")}>
          <HeaderContent>
            <Logo src={logo} alt="logo" />
          </HeaderContent>
        </Header>
      ) : (
        <BackHeader />
      )}
      <Content>{children}</Content>
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    </LayoutWrapper>
  );
};

export default MobileLayout;
