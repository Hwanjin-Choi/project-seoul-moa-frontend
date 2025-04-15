import React from "react";
import styled from "styled-components";

const StyledOutlineTag = styled.div`
  border: 1px solid #7b61ff;
  color: #7b61ff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const OutlineTag = ({ children, ...props }) => {
  return <StyledOutlineTag {...props}>{children}</StyledOutlineTag>;
};

export default OutlineTag;
