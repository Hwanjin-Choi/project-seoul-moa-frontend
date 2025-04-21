import React from "react";
import styled, { css } from "styled-components";

const getVariantStyles = ({ variant }) => {
  switch (variant) {
    case "h1":
      return css`
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
        margin: 10px 5px;
        @media (max-width: 768px) {
          font-size: 18px;
        }
      `;
    case "h2":
      return css`
        font-size: 20px;
        font-weight: 700;
        line-height: 1.2;
        margin: 10px 5px;
        @media (max-width: 768px) {
          font-size: 16px;
        }
      `;
    case "h3":
      return css`
        font-size: 18px;
        font-weight: 700;
        line-height: 1.2;
        margin: 10px 5px;
        @media (max-width: 768px) {
          font-size: 14px;
        }
      `;
    case "h4":
      return css`
        font-size: 16px;
        font-weight: 700;
        line-height: 1.2;
        margin: 0px 5px;
        @media (max-width: 768px) {
          font-size: 12px;
        }
      `;
    case "h5":
      return css`
        font-size: 14px;
        font-weight: 700;
        line-height: 1.2;
        margin: 0px 5px;
      `;
    case "h6":
      return css`
        font-size: 12px;
        font-weight: 700;
        line-height: 1.2;
        margin: 0px 5px;
        @media (max-width: 768px) {
          font-size: 10px;
        }
      `;
    default:
      return css`
        font-size: 16px;
        font-weight: 400;
        line-height: 1.2;

        @media (max-width: 768px) {
          font-size: 12px;
        }
      `;
  }
};

const Typography = ({ variant, children, ...props }) => {
  return (
    <StyledTypography variant={variant} {...props}>
      {children}
    </StyledTypography>
  );
};

export default Typography;

const StyledTypography = styled.div`
  font-family: "Pretendard", sans-serif;
  color: ${({ color }) => color || "inherit"};
  ${getVariantStyles}
`;