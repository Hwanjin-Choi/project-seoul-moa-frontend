import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

const getIsClicked = ({ isClicked }) => {
  if (isClicked) {
    return css`
      background-color: #8478ff;
      color: #fff;
    `;
  }
  return css`
    background-color: #ccc;
    color: #7b61ff;
  `;
};
const StyledCategoryButton = styled.button`
  background-color: #8478ff;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  width: 120px;
  height: 120px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${getIsClicked}
`;

const getIconColor = ({ isClicked }) => {
  if (isClicked) {
    return "#fff";
  }
  return "#7b61ff";
};

const Icon = styled(FontAwesomeIcon)`
  color: ${getIconColor};
  width: 25px;
  height: 30px;
`;
const Text = styled.p`
  color: ${getIconColor};
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
`;

const CategoryButton = (props) => {
  const [isClicked, setIsClicked] = useState(props.isClicked);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <StyledCategoryButton onClick={handleClick} isClicked={isClicked}>
      <Icon isClicked={isClicked} icon={faBookmark} />
      <Text isClicked={isClicked}>{props.category}</Text>
    </StyledCategoryButton>
  );
};

export default CategoryButton;
