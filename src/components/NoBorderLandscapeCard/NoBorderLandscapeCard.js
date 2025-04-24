import React from "react";
import styled from "styled-components";
import Typography from "../Typography/Typography";

import TestImage from "../../assets/Test.jpeg";
import Tag from "../Tag/Tag"; // 기존 Tag 컴포넌트
import IconButton from "../IconButton/IconButton";

import EventInfoDisplay from "../EventInfoDisplay/EventInfoDisplay";

// --- 기존 styled-components 정의 (변경 없음) ---
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

// --- 변경/추가된 부분 ---
// Tag 컴포넌트를 감싸면서 하단 정렬 스타일을 적용할 새 styled-component 생성
const StyledTag = styled(Tag)`
  margin-top: auto; /* 이 스타일이 태그를 DescriptionContainer 하단으로 밀어냅니다 */
  align-self: flex-start; /* 태그 자체는 왼쪽 정렬 유지 */
`;

const NoBorderLandscapeCard = (props) => {
  return (
    <NoBorderLandscapeCardContainer>
      <ImageContainer>
        <BadgeContainer>
          <Dday>D-{"19"}</Dday>
        </BadgeContainer>
        <Image src={TestImage} alt={props.title || "Card image"} />{" "}
      </ImageContainer>
      <RowContainer>
        <DescriptionContainer>
          <EventInfoDisplay
            startDate={props.startDate}
            endDate={props.endDate}
            location={props.location}
          />
          <StyledTag>{"교육/체험"}</StyledTag>
        </DescriptionContainer>

        <StyledIconButton />
      </RowContainer>
    </NoBorderLandscapeCardContainer>
  );
};

export default NoBorderLandscapeCard;
