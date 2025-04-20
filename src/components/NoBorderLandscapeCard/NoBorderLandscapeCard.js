import React from "react";
import styled from "styled-components";
import Typography from "../Typography/Typography";
import Ribbon from "../Ribbon/Ribbon";
import TestImage from "../../assets/Test.jpeg";
import Tag from "../Tag/Tag";
const NoBorderLandscapeCardContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  width: 180px;
  height: 100%;
  padding: 10px;
  position: relative !important;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const BadgeContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 12px;
  gap: 8px;
  z-index: 1;
`;
const Dday = styled.div`
  background-color: #7b61ff;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const NoBorderLandscapeCard = (props) => {
  return (
    <NoBorderLandscapeCardContainer>
      <ImageContainer>
        <BadgeContainer>
          <Dday>D-{"19"}</Dday>
        </BadgeContainer>
        <Image src={TestImage} />
      </ImageContainer>
      <RowContainer>
        <DescriptionContainer>
          <Typography variant="h3">{props.title}</Typography>
          <Typography variant="h5">{props.address}</Typography>
          <Typography variant="h5">{props.date}</Typography>
          <Tag>{"교육/체험"}</Tag>
        </DescriptionContainer>
        <Ribbon text={"count"} />
      </RowContainer>
    </NoBorderLandscapeCardContainer>
  );
};

export default NoBorderLandscapeCard;
