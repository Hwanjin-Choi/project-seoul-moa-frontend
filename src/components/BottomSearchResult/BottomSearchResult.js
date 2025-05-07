import React from "react";
import styled from "styled-components";
import { postToggleEventLike } from "../../api/interaction/event/like";
import EventCarousel from "../../pages/Map/EventCarouselMap";
// --- Styled Components 정의 ---

// 필터 폼 전체를 감싸는 Wrapper
const BottomFormWrapper = styled.div`
  background-color: white;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1); /* 위쪽 그림자 */

  transition: padding-bottom 0.3s ease-out;
  position: relative; /* 핸들 버튼 위치 기준 */
`;

// 확장/축소 핸들을 감싸는 영역
const HandleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => (props.isExpanded ? " 8px 0" : "15px 0")};
  cursor: pointer; /* 클릭 가능함을 표시 */
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
  @media (max-width: 768px) {
    padding: ${(props) => (props.isExpanded ? "5px 5px 5px 5px" : "0 20px")};
  }
  -webkit-overflow-scrolling: touch;
  transition:
    max-height 0.3s ease-out,
    padding 0.3s ease-out;
`;

// --- BottomSearchResult 컴포넌트 정의 (클릭 토글 방식) ---
const BottomSearchResult = ({
  isExpanded,
  onToggle,
  searchResult,
  handleSearchResult,
  handleSearchParams,
  searchParams,
  totalCount,
}) => {
  // 이 컴포넌트 자체의 상태는 불필요

  const handleLikeToggle = async (event, eventId) => {
    const eventIndex = searchResult.findIndex(
      (event) => event.eventId === eventId
    );
    if (eventIndex === -1) return;

    const currentEvent = searchResult[eventIndex];
    const newLikedStatus = !currentEvent.isLiked;
    const originalEvents = [...searchResult];

    handleSearchResult((prevEvents) =>
      prevEvents.map((event) =>
        event.eventId === eventId
          ? {
              ...event,
              isLiked: newLikedStatus,
              likeCount: newLikedStatus
                ? event.likeCount + 1
                : Math.max(0, event.likeCount - 1),
            }
          : event
      )
    );

    try {
      // API 호출
      const res = await postToggleEventLike(eventId);
      if (res !== "SUCCESS") {
        // 실패 시 롤백
        console.error("Error occured during toggleLikeEvent, rolling back UI.");
        handleSearchResult(originalEvents);
      }
    } catch (error) {
      console.error(
        "Error occured during toggleLikeEvent API call, rolling back UI.",
        error
      );
      handleSearchResult(originalEvents);
    }
  };

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
        <EventCarousel
          handleLikeToggle={handleLikeToggle}
          searchResult={searchResult}
          handleSearchResult={handleSearchResult}
          handleSearchParams={handleSearchParams}
          searchParams={searchParams}
          totalCount={totalCount}
          isExpanded={isExpanded}
        />
      </SearchResultWrapper>
    </BottomFormWrapper>
  );
};

// BottomSearchResult 컴포넌트를 기본으로 내보냅니다.
export default BottomSearchResult;
