import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
`;

const Container = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default Container;
