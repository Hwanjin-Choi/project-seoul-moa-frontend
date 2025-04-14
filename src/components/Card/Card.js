import React from "react";
import styled from "styled-components";
import Badge from "../Badge/Badge";
import Tag from "../Tag/Tag";

const CardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  background-color: #f0f0f0;
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
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
`;

const BookmarkButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 4px;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const Period = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
`;

const Address = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #999;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = ({
  image,
  title,
  period,
  address,
  dDay,
  bookmarked,
  onBookmarkClick,
  categories = [],
  location,
  count,
  ...props
}) => {
  return (
    <CardContainer {...props}>
      <ImageContainer>
        <Image src={image} alt={title} />
        <BadgeContainer>
          {dDay && <Badge>D-{dDay}</Badge>}
          {count && <Badge variant="secondary">{count}</Badge>}
        </BadgeContainer>
        <BookmarkButton onClick={onBookmarkClick}>
          {bookmarked ? "★" : "☆"}
        </BookmarkButton>
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Period>{period}</Period>
        <Address>{address}</Address>
        <TagContainer>
          {categories.map((category, index) => (
            <Tag key={`category-${index}`}>{category}</Tag>
          ))}
          {location && <Tag>{location}</Tag>}
        </TagContainer>
      </Content>
    </CardContainer>
  );
};

export default Card;
