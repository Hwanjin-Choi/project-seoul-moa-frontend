import React from "react";
import styled, { css } from "styled-components";

const getVariantStyles = ({ variant }) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: #7b61ff;
        color: white;
        &:hover {
          background-color: #6549ff;
        }
      `;
    case "secondary":
      return css`
        background-color: #f5f5f5;
        color: #666666;
        &:hover {
          background-color: #e8e8e8;
        }
      `;
    case "outline":
      return css`
        background-color: transparent;
        color: #7b61ff;
        border: 1px solid #7b61ff;
        &:hover {
          background-color: rgba(123, 97, 255, 0.1);
        }
      `;
    case "text":
      return css`
        background-color: transparent;
        color: #7b61ff;
      `;
    default:
      return css`
        background-color: #7b61ff;
        color: white;
        &:hover {
          background-color: #6549ff;
        }
      `;
  }
};

const getButtonWidth = ({ fullWidth }) => {
  switch (fullWidth) {
    case true:
      return css`
        width: 100%;
      `;
    default:
      return css`
        width: auto;
      `;
  }
};
const getSizeStyles = ({ size }) => {
  switch (size) {
    case "small":
      return css`
        padding: 6px 12px;
        font-size: 12px;
      `;
    case "large":
      return css`
        padding: 12px 24px;
        font-size: 16px;
      `;
    default:
      return css`
        padding: 8px 16px;
        font-size: 14px;
      `;
  }
};

const StyledButton = styled.button`
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 3px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${getVariantStyles}
  ${getSizeStyles}
  ${getButtonWidth}
`;

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = "auto",
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
