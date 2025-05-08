import React from "react";
import styled from "styled-components";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Color } from "../../styles/colorsheet";

const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
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

  &:active {
    /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); */
  }
`;
const Icon = styled(FontAwesomeIcon)`
  color: ${({ isLiked }) => (isLiked ? Color.MC1 : Color.Gray3 || "#888888")};
  transition: color 0.2s ease;
`;

const CustomIconButton = ({ onClick, disabled, isLiked, ...rest }) => {
  return (
    <StyledIconButton
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }
      }}
      disabled={disabled}
      {...rest}
    >
      <Icon icon={faBookmark} isLiked={isLiked} />
    </StyledIconButton>
  );
};

export default CustomIconButton;
