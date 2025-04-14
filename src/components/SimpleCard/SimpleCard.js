import React from "react";
import styled from "styled-components";

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
  width: 100%;
  padding-top: 130%;
  background-color: #4b4b4b;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const Ribbon = styled.div`
  position: absolute;
  top: -4px;
  right: 20px;
  width: 32px;
  height: 40px;
  background-color: #7b61ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  z-index: 1;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);

  /* Top triangle */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 32px;
    width: 0;
    height: 0;
    border-right: 8px solid #5842cc; /* darker shade for 3D effect */
    border-top: 4px solid transparent;
  }

  /* Bottom part */
  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 16px solid #7b61ff;
    border-right: 16px solid #7b61ff;
    border-bottom: 12px solid transparent;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
  }
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
      <ImageContainer>
        <Image src={image} alt={title} />
        <BadgeContainer>{dDay && <Badge>D-{dDay}</Badge>}</BadgeContainer>
        {count && <Ribbon>{count}</Ribbon>}
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Period>{period}</Period>
        <Address>{address}</Address>
        <TagContainer>
          {category && <Tag>{category}</Tag>}
          {location && <Tag>{location}</Tag>}
        </TagContainer>
      </Content>
    </CardWrapper>
  );
};

export default SimpleCard;
