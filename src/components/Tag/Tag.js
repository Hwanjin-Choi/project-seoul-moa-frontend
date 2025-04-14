import React from "react";
import styled from "styled-components";

const StyledTag = styled.span`
  background-color: #f5f5f5;
  color: #666666;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

const Tag = ({ children, ...props }) => {
  return <StyledTag {...props}>{children}</StyledTag>;
};

export default Tag;
