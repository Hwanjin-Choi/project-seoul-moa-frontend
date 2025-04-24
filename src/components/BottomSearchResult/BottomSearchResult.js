import React, { useState } from "react"; // useState 제거 (내부 상태 불필요)
import styled from "styled-components";
// 필요한 아이콘들을 react-icons에서 가져옵니다.
import { FiChevronDown } from "react-icons/fi"; // 아이콘 사용 안 함 (제거 가능)
// 검색 결과 카드를 불러옵니다. (경로는 실제 프로젝트에 맞게 조정 필요)
import NoBorderLandscapeCard from "../NoBorderLandscapeCard/NoBorderLandscapeCard";

// --- Styled Components 정의 ---

// 필터 폼 전체를 감싸는 Wrapper
const BottomFormWrapper = styled.div`
  background-color: white;
  border-top-left-radius: 15px; /* 상단 왼쪽 모서리 둥글게 */
  border-top-right-radius: 15px; /* 상단 오른쪽 모서리 둥글게 */
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1); /* 위쪽 그림자 */
  /* 확장 상태에 따라 하단 패딩 조절 (선택 사항) */
  /* padding-bottom: ${(props) => (props.isExpanded ? "20px" : "0")}; */
  /* transition: padding-bottom 0.3s ease-out; */ /* 패딩 애니메이션 제거 또는 조정 */
  position: relative; /* 핸들 버튼 위치 기준 */
  /* overflow: hidden; */ /* 내부 스크롤을 위해 hidden 제거 또는 확인 */
`;

// 확장/축소 핸들을 감싸는 영역
const HandleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0; /* 핸들 영역 상하 패딩 */
  cursor: pointer; /* 클릭 가능함을 표시 */
  /* 확장 시 하단 구분선 추가 (선택 사항) */
  border-bottom: ${(props) => (props.isExpanded ? "1px solid #eee" : "none")};
  transition: border-bottom 0.3s ease-out;
`;

// 실제 핸들 버튼 (회색 바 형태)
const HandleButton = styled.button`
  width: 40px;
  height: 5px;
  background-color: #d0d0d0; /* 핸들 색상 */
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 0;
`;

// 검색 결과 리스트를 감싸는 스크롤 가능한 영역
const SearchResultWrapper = styled.div`
  /* 확장 시에만 상하 패딩 적용, 좌우 패딩은 항상 적용 */
  padding: ${(props) => (props.isExpanded ? "20px 20px 20px 20px" : "0 20px")};
  /* 확장 상태에 따라 최대 높이 조절 */
  max-height: ${(props) =>
    props.isExpanded ? "300px" : "0"}; /* 충분한 높이 설정 */
  overflow-y: auto; /* 'scroll' 대신 'auto' 사용, 수직 스크롤만 */
  -webkit-overflow-scrolling: touch; /* iOS 관성 스크롤 활성화 */
  /* 높이 및 패딩 변경 애니메이션 */
  transition:
    max-height 0.3s ease-out,
    padding 0.3s ease-out;
`;

// --- 임시 데이터 ---
const UpcomingEventsField = [
  {
    id: 1, // 각 항목에 고유 key 추가 권장
    title: "[광진문화재단] 제4회 2025 나루 스트릿 댄스 페스티벌",
    location: "서울시립 북서울미술관 2층 전시실 3, 4",
    startDate: "2025-05-13T00:00:00",
    endDate: "2025-06-04T00:00:00",
  },
  {
    id: 2,
    title: "[종로문화재단] 2025 전통 연희 축제",
    location: "운현궁 특설무대",
    startDate: "2025-05-18T00:00:00",
    endDate: "2025-05-18T00:00:00", // 당일 행사 예시
  },
  {
    id: 3,
    title: "[서초문화재단] 클래식 음악회 '봄의 향연'",
    location: "서초문화예술회관 대강당",
    startDate: "2025-06-01T00:00:00",
    endDate: "2025-06-30T00:00:00",
  },
  // 필요시 더 많은 데이터 추가...
];

// --- BottomSearchResult 컴포넌트 정의 (클릭 토글 방식) ---
const BottomSearchResult = ({
  isExpanded, // 확장/축소 상태 (prop으로 받음)
  onToggle, // 확장/축소 토글 함수 (prop으로 받음)
}) => {
  // 이 컴포넌트 자체의 상태는 불필요

  return (
    // 폼 전체 Wrapper, 확장 상태 전달
    <BottomFormWrapper isExpanded={isExpanded}>
      {/* 핸들 영역, 클릭 시 onToggle 함수 호출 */}
      <HandleWrapper onClick={onToggle} isExpanded={isExpanded}>
        <HandleButton
          aria-label={isExpanded ? "검색 결과 접기" : "검색 결과 펼치기"}
        />
      </HandleWrapper>

      {/* 실제 검색 결과 내용 영역, 확장 상태 전달 */}
      <SearchResultWrapper isExpanded={isExpanded}>
        {/* 데이터가 있을 경우 리스트 렌더링 */}
        {UpcomingEventsField.length > 0 ? (
          UpcomingEventsField.map((item) => (
            // 각 카드에 고유 key prop 전달
            <NoBorderLandscapeCard
              key={item.id} // 고유 key 추가
              title={item.title}
              endDate={item.endDate}
              startDate={item.startDate}
              location={item.location}
              // 필요시 다른 props 전달
            />
          ))
        ) : (
          // 데이터가 없을 경우 메시지 표시 (선택 사항)
          <p style={{ textAlign: "center", color: "#888", padding: "20px 0" }}>
            검색 결과가 없습니다.
          </p>
        )}
      </SearchResultWrapper>
    </BottomFormWrapper>
  );
};

// BottomSearchResult 컴포넌트를 기본으로 내보냅니다.
export default BottomSearchResult;
