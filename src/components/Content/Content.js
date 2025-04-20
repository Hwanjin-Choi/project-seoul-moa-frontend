import styled from "styled-components";
import React from "react";

const ContentContainer = styled.div`
  padding: 20px 30px;
  overflow-y: auto;
  height: calc(100vh - 80px);
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const Content = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>;
};

export default Content;
