import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import BackHeader from "../BackHeader/BackHeader"; // BackHeader만 import
// logo, useLocation, useNavigate, Header, HeaderContent, Logo 등 제거
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

  box-sizing: border-box;
  overflow: hidden; /* LayoutWrapper 자체의 스크롤은 막음 */
`;

const Content = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;

  padding: 0 0 60px 0;

  @media (max-width: 768px) {
    padding: 0 0 60px 0;
  }
`;

const NavigationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
/* const Logo = styled.img`
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
`; */

const MobileLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <BackHeader />
      <Content>{children}</Content>
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    </LayoutWrapper>
  );
};

export default MobileLayout;
