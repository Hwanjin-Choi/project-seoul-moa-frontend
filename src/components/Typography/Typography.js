import React from "react";
import styled, { css } from "styled-components";

const getVariantStyles = ({ variant }) => {
  switch (variant) {
    case "h1":
      return css`
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
      `;
    case "h2":
      return css`
        font-size: 20px;
        font-weight: 700;
        line-height: 1.2;
      `;
    case "h3":
      return css`
        font-size: 18px;
        font-weight: 700;
        line-height: 1.2;
      `;
    case "h4":
      return css`
        font-size: 16px;
        font-weight: 700;
        line-height: 1.2;
      `;
    case "h5":
      return css`
        font-size: 14px;
        font-weight: 700;
        line-height: 1.2;
      `;
    case "h6":
      return css`
        font-size: 12px;
        font-weight: 700;
        line-height: 1.2;
      `;
    default:
      return css`
        font-size: 16px;
        font-weight: 400;
        line-height: 1.2;
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

  ${getVariantStyles}
`;
