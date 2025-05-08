import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  parseISO,
  format,
  isSameDay,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
} from "date-fns";
import { ko } from "date-fns/locale";
import { FiMapPin, FiCalendar, FiFileText, FiHeart } from "react-icons/fi";

const Wrapper = styled.div`
  font-family: sans-serif;
  line-height: 1.5;
  color: #333;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 769px) {
    /* 데스크탑 화면 이상 */
    margin-bottom: 6px; /* 데스크탑 행 간격 */
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 6px; /* 모바일 아이콘-텍스트 간격 약간 줄임 */
  flex-shrink: 0;
  color: #666;
  font-size: 1em; /* 아이콘 크기 기준 */

  svg {
    /* react-icons의 svg 크기 조절 */
    width: 14px;
    height: 14px;
    @media (min-width: 769px) {
      width: 16px;
      height: 16px;
    }
  }

  @media (min-width: 769px) {
    margin-right: 8px; /* 데스크탑 아이콘-텍스트 간격 */
  }
`;

const InfoText = styled.span`
  flex-grow: 1;
  min-width: 0;
  font-weight: normal; /* 기본 폰트 두께 normal로 변경 */
  font-size: 0.8rem; /* 모바일 기본 폰트 크기 (약 12.8px) */
  color: #555; /* 부가 정보 텍스트 색상 약간 연하게 */

  /* 제목 행의 InfoText 스타일링 (Wrapper의 첫번째 InfoRow 자식 내부) */
  ${Wrapper} ${InfoRow}:first-child & {
    font-weight: bold; /* 제목은 bold 유지 */
    font-size: 0.9rem; /* 모바일 제목 폰트 크기 (약 14.4px) */
    color: #333; /* 제목 텍스트 색상 진하게 */
    @media (min-width: 769px) {
      font-size: 1rem; /* 데스크탑 제목 폰트 크기 */
    }
  }

  @media (min-width: 769px) {
    /* 데스크탑 화면 이상 */
    font-size: 0.9rem; /* 데스크탑 부가 정보 폰트 크기 */
  }
`;

const getEventStatus = (startDate, endDate) => {
  const now = new Date();
  const start = startOfDay(startDate);
  const end = endOfDay(endDate);

  if (isBefore(now, start)) {
    return { text: "예정", color: "#5a8dee" };
  } else if (isAfter(now, end)) {
    return { text: "종료", color: "#888888" };
  } else {
    return { text: "진행중", color: "#34a853" };
  }
};

const EventInfoDisplay = ({
  title,
  location,
  startDate,
  endDate,
  likeCount,
}) => {
  let parsedStartDate, parsedEndDate;
  let dateString = "날짜 정보 없음";

  try {
    parsedStartDate = parseISO(startDate);
    parsedEndDate = parseISO(endDate);

    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      throw new Error("유효하지 않은 날짜 형식입니다.");
    }

    const formatString = "yyyy.MM.dd(EEE)";
    const formattedStartDate = format(parsedStartDate, formatString, {
      locale: ko,
    });

    if (isSameDay(parsedStartDate, parsedEndDate)) {
      dateString = formattedStartDate;
    } else {
      const formattedEndDate = format(parsedEndDate, formatString, {
        locale: ko,
      });
      dateString = `${formattedStartDate} ~ ${formattedEndDate}`;
    }
  } catch (error) {
    console.error("날짜 처리 중 오류 발생:", error);
  }

  return (
    <Wrapper>
      <InfoRow>
        <IconWrapper>
          <FiFileText />
        </IconWrapper>

        <InfoText>{title || "제목 없음"}</InfoText>
      </InfoRow>

      <InfoRow>
        <IconWrapper>
          <FiMapPin />
        </IconWrapper>
        <InfoText>{location || "장소 정보 없음"}</InfoText>
      </InfoRow>

      <InfoRow>
        <IconWrapper>
          <FiCalendar />
        </IconWrapper>
        <InfoText>{dateString}</InfoText>
      </InfoRow>

      <InfoRow>
        <IconWrapper>
          <FiHeart />
        </IconWrapper>
        <InfoText>{likeCount}명이 관심있어 합니다</InfoText>
      </InfoRow>
    </Wrapper>
  );
};

EventInfoDisplay.propTypes = {
  title: PropTypes.string,
  location: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  likeCount: PropTypes.number,
};

EventInfoDisplay.defaultProps = {
  title: "제목 없음",
  location: "장소 정보 없음",
  startDate: "",
  endDate: "",
  likeCount: 0,
};

export default EventInfoDisplay;
