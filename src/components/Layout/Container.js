import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  padding: 0 25px;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 720px;
    padding: 0 55px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
    padding: 0 70px;
  }
`;

const Container = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default Container;
