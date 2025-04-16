import React from "react";
import styled, { css } from "styled-components";
import { Color } from "../../styles/colorsheet";

const getVariantStyles = ({ variant }) => {
  switch (variant) {
    case "h1":
      return css`
        font-size: 25px;
        font-weight: 700;
      `;
    case "h2":
      return css`
        font-size: 20px;
        font-weight: 700;
      `;
    case "h3":
      return css`
        font-size: 15px;
        font-weight: 700;
      `;
    case "h4":
      return css`
        font-size: 15px;
        font-weight: 500;
      `;
    case "h5":
      return css`
        font-size: 12px;
        font-weight: 500;
      `;
    case "h6":
      return css`
        font-size: 10px;
        font-weight: 500;
      `;
    default:
      return css`
        font-size: 14px;

        @media (min-width: 768px) {
          font-size: 18px;
        }

        @media (min-width: 1024px) {
          font-size: 20px;
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
  font-family: "Noto Sans", sans-serif;
  color: ${({ color }) => color || Color.BC2};

  ${getVariantStyles}
`;