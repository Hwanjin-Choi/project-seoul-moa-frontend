import React from "react";
import styled from "styled-components";

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioText = styled.span`
  margin-left: 8px;
`;

const Radio = ({ label, checked, onChange }) => {
  return (
    <RadioContainer>
      <RadioInput type="radio" checked={checked} onChange={onChange} />
      <RadioLabel>
        <RadioText onClick={onChange}>{label}</RadioText>
      </RadioLabel>
    </RadioContainer>
  );
};

export default Radio;
