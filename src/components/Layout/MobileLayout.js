import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
const LayoutWrapper = styled.div`
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
  }
  width: 100%;
  position: relative;
  background: linear-gradient(to bottom, #f3f2ff, #ccc7fa);
`;

const Content = styled.div``;


const MobileLayout = ({ children }) => {
  
  return (
    <LayoutWrapper>
      <Content>{children}</Content>
    </LayoutWrapper>
  );
};

export default MobileLayout;
