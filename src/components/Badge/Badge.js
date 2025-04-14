import React from "react";
import styled from "styled-components";

const StyledBadge = styled.span`
  background-color: ${(props) =>
    props.variant === "primary" ? "#7B61FF" : "#E0E0E0"};
  color: ${(props) => (props.variant === "primary" ? "#FFFFFF" : "#666666")};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`;

const Badge = ({ children, variant = "primary", ...props }) => {
  return (
    <StyledBadge variant={variant} {...props}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
