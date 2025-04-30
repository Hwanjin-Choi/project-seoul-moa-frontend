import React from "react";
import styled from "styled-components";
import Tag from "../Tag/Tag"; // 기존 Tag 컴포넌트
import IconButton from "../IconButton/IconButton";

import EventInfoDisplay from "../EventInfoDisplay/EventInfoDisplay";

const NoBorderLandscapeCardContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  width: 180px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 100px;
  }
  padding: 10px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    object-fit: contain;
  }
  display: block;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  min-width: 0;
  padding: 10px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column; // 세로 방향 flex 유지
  flex-grow: 1;
  min-width: 0;
  margin-right: 10px;
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
  @media (max-width: 768px) {
    padding: 4px 8px;
  }
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const StyledIconButton = styled(IconButton)`
  flex-shrink: 0;
`;

const TagContainer = styled.div`
  margin-top: auto;
`;

const StyledTag = styled(Tag)`
  align-self: flex-start; /* 태그 자체는 왼쪽 정렬 유지 */
`;
const calculateDday = (startDateStr) => {
  if (!startDateStr) return "";
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(startDateStr);
    startDate.setHours(0, 0, 0, 0);
    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `D-${diffDays}`;
    } else if (diffDays === 0) {
      return "D-Day";
    } else {
      return "종료";
    }
  } catch (error) {
    console.error("D-day 계산 오류:", error);
    return "";
  }
};

const NoBorderLandscapeCard = (props) => {
  const dDayString = calculateDday(props.startDate);

  return (
    <NoBorderLandscapeCardContainer>
      <ImageContainer>
        <BadgeContainer>
          <Dday>{dDayString}</Dday>
        </BadgeContainer>
        <Image src={props.image} alt={props.title || "Card image"} />{" "}
      </ImageContainer>
      <RowContainer>
        <DescriptionContainer>
          <EventInfoDisplay
            title={props.title}
            startDate={props.startDate}
            endDate={props.endDate}
            location={props.location}
            likeCount={props.likeCount}
          />

          <TagContainer>
            <StyledTag>{props.category}</StyledTag>
            <StyledTag>{props.gu}</StyledTag>
          </TagContainer>
        </DescriptionContainer>

        <StyledIconButton
          onClick={props.onLikeToggle}
          isLiked={props.isLiked}
        />
      </RowContainer>
    </NoBorderLandscapeCardContainer>
  );
};

export default NoBorderLandscapeCard;
