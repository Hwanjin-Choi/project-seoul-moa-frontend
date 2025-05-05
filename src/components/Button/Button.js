import React from "react";
import styled, { css } from "styled-components";
import { Color } from "../../styles/colorsheet";

const getVariantStyles = ({ variant }) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: ${Color.MC1};
        color: white;
        &:hover {
          background-color: ${Color.MC2};
        }
      `;
    case "secondary":
      return css`
        background-color: ${Color.MC5};
        color: ${Color.BC3};
        &:hover {
          background-color: ${Color.MC4};
        }
      `;
    case "outline":
      return css`
        background-color: transparent;
        color: ${Color.MC1};
        border: 1px solid ${Color.MC1};
        &:hover {
          background-color: rgba(132, 120, 255, 0.1); // MC1의 rgba
        }
      `;
    case "text":
      return css`
        background-color: transparent;
        color: ${Color.MC1};
        font-weight: 700;
      `;
    default:
      return css`
        background-color: ${Color.MC1};
        color: white;
        &:hover {
          background-color: ${Color.MC2};
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
  &:hover {
    background-color: #eee;
  }
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
