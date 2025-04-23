import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components"; // styled-components 가져오기
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
import { FiMapPin, FiCalendar, FiFileText } from "react-icons/fi";

// --- Styled Components 정의 ---

// 컴포넌트 전체를 감싸는 Wrapper
const Wrapper = styled.div`
  font-family: sans-serif; /* 테마가 있다면 theme provider의 폰트 사용 권장 */
  line-height: 1.6;
  color: #333; /* 기본 텍스트 색상, 필요시 조정 */
`;

// 장소 또는 날짜 정보를 담는 한 줄 (아이콘 + 텍스트)
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px; /* 행 간의 간격 */

  /* 마지막 행에는 하단 마진 제거 */
  &:last-child {
    margin-bottom: 0;
  }
`;

// 아이콘을 감싸는 영역 (스타일 일관성 유지 목적)
const IconWrapper = styled.span`
  display: flex; /* 아이콘 수직 정렬 도움 */
  align-items: center;
  margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
  flex-shrink: 0; /* 컨테이너 크기가 줄어도 아이콘 크기 유지 */
  color: #666; /* 아이콘 색상 */
`;

// 주요 텍스트(장소, 날짜)를 표시하는 영역
const InfoText = styled.span`
  flex-grow: 1; /* 가능한 공간 차지 (텍스트가 길 경우 대비) */
  min-width: 0; /* flex 컨테이너 내에서 내용 넘침 방지 */
  font-weight: bold;
`;

// 상태(예정, 진행중, 종료)를 표시하는 배지
const StatusBadge = styled.span`
  display: inline-block;
  margin-left: 8px; /* 날짜 텍스트와의 간격 */
  padding: 2px 8px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  /* props로 전달된 color 값 사용, 없으면 기본 회색 */
  background-color: ${(props) => props.color || "#888888"};
  border-radius: 10px;
  vertical-align: middle; /* 옆 텍스트와 수직 정렬 */
`;

// --- Helper 함수 (getEventStatus - 변경 없음) ---
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

// --- 컴포넌트 로직 (날짜 처리 등 - 변경 없음) ---
const EventInfoDisplay = ({ location, startDate, endDate }) => {
  console.log(location, startDate, endDate);
  let parsedStartDate, parsedEndDate;
  let dateString = "날짜 정보 없음";
  let status = null;

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

    status = getEventStatus(parsedStartDate, parsedEndDate);
  } catch (error) {
    console.error("날짜 처리 중 오류 발생:", error);
  }

  // --- Styled Components를 사용하여 렌더링 ---
  return (
    <Wrapper>
      {/* 장소 정보 행 */}
      <InfoRow>
        <IconWrapper>
          <FiFileText />
        </IconWrapper>
        <InfoText>
          {
            "[서울시립 북서울미술관] 대학(원)생 전시 감상 프로그램 [캠퍼스 옆 미술관]"
          }
        </InfoText>
      </InfoRow>

      <InfoRow>
        <IconWrapper>
          <FiMapPin />
        </IconWrapper>
        <InfoText>{location || "장소 정보 없음"}</InfoText>
      </InfoRow>
      {/* 날짜 및 상태 정보 행 */}
      <InfoRow>
        <IconWrapper>
          <FiCalendar />
        </IconWrapper>
        <InfoText>{dateString}</InfoText>
        {/* 상태가 있을 경우 StatusBadge 렌더링 */}
      </InfoRow>
    </Wrapper>
  );
};

// --- PropTypes 정의 (변경 없음) ---
EventInfoDisplay.propTypes = {
  location: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default EventInfoDisplay;

// 사용 예시는 이전과 동일합니다.
