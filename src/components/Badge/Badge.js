import React from "react";
import styled from "styled-components";

const StyledBadge = styled.span`
  background-color: ${(props) =>
    props.variant === "primary" ? "#7B61FF" : "#E0E0E0"};
  color: ${(props) => (props.variant === "primary" ? "#FFFFFF" : "#666666")};
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Badge = ({ children, variant, ...props }) => {
  return (
    <StyledBadge variant={variant} {...props}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
