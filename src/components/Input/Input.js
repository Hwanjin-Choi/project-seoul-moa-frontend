import React from "react";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${Color.BC4};
  padding: 0 10px;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default Input;
