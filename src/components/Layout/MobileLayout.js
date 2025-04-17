import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
const LayoutWrapper = styled.div`
  margin: 0 auto; // Center the layout

  @media (min-width: 768px) {
    // Adjust this value based on your tablet breakpoint
    max-width: 720px; // Set the desired width for larger screens
  }

  @media (min-width: 1024px) {
    // Optional: Adjust for larger screens
    max-width: 960px; // Set another width if needed
  }

  position: relative;
  padding-bottom: 60px; /* Height of the navigation bar */
  background: white;
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
