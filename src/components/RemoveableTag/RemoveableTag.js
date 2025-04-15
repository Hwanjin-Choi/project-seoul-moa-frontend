import React from "react";
import styled from "styled-components";

const StyledTag = styled.span`
  background-color: #f5f5f5;
  color: #666666;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 4px;
`;

const RemoveableTag = ({ children, ...props }) => {
  return (
    <StyledTag {...props}>
      {children}
      <RemoveButton>x</RemoveButton>
    </StyledTag>
  );
};

export default RemoveableTag;
