import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BackHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  height: 60px;
`;

const BackHeaderButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const BackHeader = () => {
  return (
    <BackHeaderContainer>
      <BackHeaderButton>
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
      </BackHeaderButton>
    </BackHeaderContainer>
  );
};

export default BackHeader;
