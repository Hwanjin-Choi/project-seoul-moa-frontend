import React from "react";
import styled from "styled-components";
import Tag from "../Tag/Tag"; // 기존 Tag 컴포넌트
import IconButton from "../IconButton/IconButton";

import EventInfoDisplay from "../EventInfoDisplay/EventInfoDisplay";
import { useNavigate } from "react-router-dom";

const NoBorderLandscapeCardContainer = styled.div`
  width: 100%;
  display: flex; /* 기본은 가로 배치 */
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    /* 데스크탑 hover 효과 */
    background-color: #f0f0f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    /* 모바일 화면 (breakpoint는 조절 가능) */
    flex-direction: column; /* 세로 배치로 변경 */
    padding: 0; /* 내부 컨텐츠 패딩으로 조절 */
    &:hover {
      /* 모바일에서는 hover 효과 제거 또는 다른 효과 */
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

const ImageContainer = styled.div`
  width: 180px; /* 데스크탑 이미지 너비 */
  flex-shrink: 0;
  position: relative; /* BadgeContainer 위치 기준 */
  padding: 10px; /* 데스크탑 패딩 */

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서 너비 100% */
    height: 180px; /* 예시 높이, 또는 aspect-ratio 사용 */
    padding: 0; /* 패딩 제거 또는 조절 */
    margin-bottom: 10px; /* 아래 텍스트와의 간격 */
    flex-shrink: 1; /* 필요시 추가 */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 데스크탑에서는 cover */
  display: block;

  @media (max-width: 768px) {
    /* 모바일 이미지 스타일 (필요시 object-fit 변경 등) */
    border-radius: 8px 8px 0 0; /* 예시: 위쪽 모서리 둥글게 */
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  min-width: 0;
  padding: 10px; /* 데스크탑 패딩 */

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서 너비 100% */
    padding: 10px 15px; /* 모바일용 패딩 조절 */
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 5px; /* 아이콘 버튼과의 간격 조절 */
  }
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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view-detail-page/${props.eventId}`);
  };
  return (
    <NoBorderLandscapeCardContainer onClick={handleClick}>
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
