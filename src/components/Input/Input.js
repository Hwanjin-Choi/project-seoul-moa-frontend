import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default Input;
