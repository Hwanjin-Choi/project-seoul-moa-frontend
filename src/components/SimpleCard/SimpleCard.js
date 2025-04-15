import React from "react";
import styled from "styled-components";
import RemoveableTag from "../RemoveableTag/RemoveableTag";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import OutlineTag from "../OutlineTag/OutlineTag";

import Ribbon from "../Ribbon/Ribbon";
const CardWrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  position: relative;
  padding: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
  z-index: 1;
`;

const Badge = styled.div`
  background-color: #7b61ff;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const Content = styled.div`
  padding: 16px;
  color: #333;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const Period = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: #666;
`;

const Address = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin-bottom: 16px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  border: 1px solid #7b61ff;
  color: #7b61ff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const SimpleCard = ({
  image,
  title,
  period,
  address,
  dDay,
  count,
  category,
  location,
  ...props
}) => {
  return (
    <CardWrapper {...props}>
      <Ribbon text={count} />
      <ImageContainer>
        <Image src={image} alt={title} />
        <BadgeContainer>{dDay && <Badge>D-{dDay}</Badge>}</BadgeContainer>
      </ImageContainer>
      <Content>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h5">{period}</Typography>
        <Typography variant="h6">{address}</Typography>
        <Button>카테고리 추가</Button>
        <TagContainer>
          {category && <OutlineTag>{"Text"}</OutlineTag>}

          {category && <RemoveableTag>{"서울생활박물관"}</RemoveableTag>}
        </TagContainer>
      </Content>
    </CardWrapper>
  );
};

export default SimpleCard;
