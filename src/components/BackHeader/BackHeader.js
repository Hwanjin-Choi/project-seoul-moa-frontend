import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { useNavigate } from "react-router-dom";
const BackHeaderContainer = styled.div`
  z-index: 1000;
  width: 100%;
  background: transparent;
  position: sticky;
  top: 0;
  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
  }
`;

const BackHeaderButton = styled.button`
  cursor: pointer;
  padding: 20px 10px;
  transition: opacity 0.2s ease-in-out;

  &:active {
    opacity: 0.7;
  }
  margin-left: 10px;
  @media (min-width: 768px) {
    padding: 10px 10px;
  }
`;
const Icon = styled(FontAwesomeIcon)`
  color: #91909c;
  width: 35px;
  height: 35px;
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const BackHeader = () => {
  const navigate = useNavigate();
  return (
    <BackHeaderContainer>
      <BackHeaderButton onClick={() => navigate(-1)}>
        <Icon icon={faChevronLeft} />
      </BackHeaderButton>
    </BackHeaderContainer>
  );
};

export default BackHeader;
