import React from "react";
import styled, { css } from "styled-components";

const getVariantStyles = ({ variant }) => {
  switch (variant) {
    case "h1":
      return css`
        font-size: 1.5em; /* 24px / 16px (기본 브라우저 font-size) = 1.5em */
        font-weight: 700;
        line-height: 1.2;
        margin: 0.625em 0.3125em; /* 10px / 16px = 0.625em, 5px / 16px = 0.3125em */
        @media (max-width: 768px) {
          font-size: 1.125em; /* 18px / 16px = 1.125em */
        }
      `;
    case "h2":
      return css`
        font-size: 1.25em; /* 20px / 16px = 1.25em */
        font-weight: 700;
        line-height: 1.2;
        margin: 0.625em 0.3125em;
        @media (max-width: 768px) {
          font-size: 1em; /* 16px / 16px = 1em */
        }
      `;
    case "h3":
      return css`
        font-size: 1.125em; /* 18px / 16px = 1.125em */
        font-weight: 700;
        line-height: 1.2;

        @media (max-width: 768px) {
          font-size: 0.875em; /* 14px / 16px = 0.875em */
        }
      `;
    case "h4":
      return css`
        font-size: 1em; /* 16px / 16px = 1em */
        font-weight: 700;
        line-height: 1.2;
        margin: 0em 0.3125em;
        @media (max-width: 768px) {
          font-size: 0.75em; /* 12px / 16px = 0.75em */
        }
      `;
    case "h5":
      return css`
        font-size: 0.875em; /* 14px / 16px = 0.875em */
        font-weight: 700;
        line-height: 1.2;
        margin: 0em 0.3125em;
      `;
    case "h6":
      return css`
        font-size: 0.75em; /* 12px / 16px = 0.75em */
        font-weight: 700;
        line-height: 1.2;
        margin: 0em 0.3125em;
        @media (max-width: 768px) {
          font-size: 0.625em; /* 10px / 16px = 0.625em */
        }
      `;
    default:
      return css`
        font-size: 1em; /* 16px / 16px = 1em */
        font-weight: 400;
        line-height: 1.2;
        @media (max-width: 768px) {
          font-size: 0.75em; /* 12px / 16px = 0.75em */
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
