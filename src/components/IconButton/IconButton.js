import React from "react";
import styled from "styled-components";
import { faBookmark } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px; /* 기본 패딩 값 */
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none; /* 포커스 스타일 제거 (필요에 따라 추가) */
  border-radius: 4px; /* 둥근 모서리 (선택 사항) */
  width: fit-content;
  height: fit-content;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08); /* 호버 시 배경색 변화 (선택 사항) */
  }
  @media (min-width: 768px) {
    padding: 4px;
    & > svg {
      width: 20px;
      height: 20px;
    }
  }

  &:disabled {
    opacity: 0.48;
    cursor: default;
    pointer-events: none;
  }

  ${(props) =>
    props.color === "primary" &&
    `
    color: blue; /* 예시 primary 색상 */
  `}

  ${(props) =>
    props.color === "secondary" &&
    `
    color: purple; /* 예시 secondary 색상 */
  `}

  /* 클릭 시 그림자 변화 (선택 사항) */
  &:active {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`;
const Icon = styled(FontAwesomeIcon)`
  color: #7b61ff; // Set the color
`;

const CustomIconButton = ({
  children,
  onClick,
  disabled,
  size,
  color,
  ...rest
}) => {
  return (
    <StyledIconButton
      onClick={(e) => {
        console.log("clicked");
        e.stopPropagation();
      }}
      disabled={disabled}
      size={size}
      color={color}
      {...rest}
    >
      <Icon icon={faBookmark}></Icon>
    </StyledIconButton>
  );
};

export default CustomIconButton;
