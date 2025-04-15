import React from "react";
import styled from "styled-components";

const StyledSmallCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SmallCard = ({ ...props }) => {
  return <StyledSmallCard {...props} />;
};

export default SmallCard;
