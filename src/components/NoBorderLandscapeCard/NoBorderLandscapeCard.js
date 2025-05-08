import React from "react";
import styled from "styled-components";
import Tag from "../Tag/Tag"; // 기존 Tag 컴포넌트
import IconButton from "../IconButton/IconButton";

import EventInfoDisplay from "../EventInfoDisplay/EventInfoDisplay";
import { useNavigate } from "react-router-dom";

// NoBorderLandscapeCardContainer: 카드 전체 컨테이너
const NoBorderLandscapeCardContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
  background-color: #fff; // 기본 배경색 추가

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  // 모바일 화면 (768px 이하) 스타일
  @media (max-width: 768px) {
    flex-direction: column; // 세로 배치로 변경
    padding: 0; // 모바일에서는 컨테이너 자체 패딩 제거
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08); // 모바일용 그림자
    border-radius: 8px; // 모바일 카드 모서리 둥글게
    margin-bottom: 16px; // 카드 간 간격
    &:hover {
      background-color: #fff; // 모바일에서는 hover 시 배경색 변경 없음
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08); // hover 시 그림자 유지
    }
  }
`;

// ImageContainer: 이미지 컨테이너
const ImageContainer = styled.div`
  width: 180px;
  height: 160px;
  flex-shrink: 0;
  position: relative;
  padding: 10px;

  @media (max-width: 768px) {
    width: 100%; // 모바일에서 너비 100%
    height: 180px; // 모바일 이미지 높이 (조정 가능)
    padding: 0; // 모바일 이미지 컨테이너 패딩 제거
  }
`;

// Image: 실제 이미지 요소
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    border-radius: 8px 8px 0 0; // 모바일에서 이미지 위쪽 모서리만 둥글게
  }
`;

// ContentArea: 모바일에서 이미지 하단의 모든 콘텐츠를 감싸는 영역
const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  padding: 10px; // 데스크탑 기본 패딩

  @media (max-width: 768px) {
    padding: 12px 16px; // 모바일용 패딩
  }
`;

// InfoRow: 모바일에서 제목과 아이콘 버튼을 한 줄에 배치하기 위한 컨테이너
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; // 아이콘과 제목 상단 정렬
  width: 100%;
`;

// DescriptionContainer: 이벤트 제목, 날짜, 장소 등 텍스트 정보 컨테이너
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 0; // 모바일에서는 오른쪽 마진 제거
    // EventInfoDisplay 내부 요소들의 스타일은 EventInfoDisplay 컴포넌트에서 조정 필요
  }
`;

// BadgeContainer: D-day 배지 컨테이너
const BadgeContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 12px;
  gap: 8px;
  z-index: 1;

  @media (max-width: 768px) {
    top: 10px; // 모바일 D-Day 배지 위치
    right: 10px;
  }
`;

// Dday: D-day 배지 스타일
const Dday = styled.div`
  background-color: #7b61ff;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px; // 모바일 D-Day 폰트 크기
    padding: 4px 10px; // 모바일 D-Day 패딩
  }
`;

// StyledIconButton: 아이콘 버튼 스타일 확장
const StyledIconButton = styled(IconButton)`
  flex-shrink: 0;
  // 모바일에서 아이콘 버튼 크기나 위치를 조정하려면 여기에 추가
  @media (max-width: 768px) {
    // 예: margin-top: -4px; // 제목과 시각적 정렬을 위해 미세 조정
  }
`;

// TagContainer: 태그들을 담는 컨테이너
const TagContainer = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
  padding-top: 8px; // 설명과의 간격

  @media (max-width: 768px) {
    margin-top: 10px; // 모바일에서 설명과의 간격
    padding-top: 0;
  }
`;

// StyledTag: 태그 스타일 확장
const StyledTag = styled(Tag)`
  align-self: flex-start;
  // 모바일에서 태그 스타일을 조정하려면 여기에 추가
`;

// calculateDday: D-day 계산 함수 (변경 없음)
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

// NoBorderLandscapeCard: 메인 카드 컴포넌트
const NoBorderLandscapeCard = (props) => {
  const dDayString = calculateDday(props.startDate);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.closest(StyledIconButton.toString())) {
      return;
    }
    navigate(`/view-detail-page/${props.eventId}`);
  };

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    if (props.onLikeToggle) {
      props.onLikeToggle();
    }
  };

  return (
    <NoBorderLandscapeCardContainer onClick={handleClick}>
      <ImageContainer>
        {dDayString && (
          <BadgeContainer>
            <Dday>{dDayString}</Dday>
          </BadgeContainer>
        )}
        <Image src={props.image} alt={props.title || "Card image"} />
      </ImageContainer>

      {/* 데스크탑에서는 RowContainer 사용, 모바일에서는 ContentArea 내부에서 처리 */}
      {/* styled-components의 미디어쿼리로 대부분 처리하므로, JSX 구조는 최대한 유지 */}
      <ContentArea>
        <InfoRow>
          <DescriptionContainer>
            <EventInfoDisplay
              title={props.title}
              startDate={props.startDate}
              endDate={props.endDate}
              location={props.location}
              likeCount={props.likeCount}
            />
          </DescriptionContainer>
          <StyledIconButton
            onClick={handleLikeToggle}
            isLiked={props.isLiked}
          />
        </InfoRow>
        <TagContainer>
          {props.category && <StyledTag>{props.category}</StyledTag>}
          {props.gu && <StyledTag>{props.gu}</StyledTag>}
        </TagContainer>
      </ContentArea>
    </NoBorderLandscapeCardContainer>
  );
};

export default NoBorderLandscapeCard;
