import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getUpcomingEvents } from "../../api/event/events";
// --- 스타일 컴포넌트 (이전 답변과 유사하게 정의) ---
const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: ${(props) => (props.isExpanded ? "20px" : "0")};
  @media (min-width: 768px) {
    padding: 0 45px;
  }
`;

const ItemContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  min-height: 150px; /* 로딩/에러 시 최소 높이 유지 (예시) */
  position: relative; /* 로딩 오버레이를 위한 기준 */
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  color: #333;
  padding: 0;
  transition:
    background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

const PrevButton = styled(NavButton)`
  left: 0px;
`;
const NextButton = styled(NavButton)`
  right: 0px;
`;

const MessageContainer = styled.div`
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: #6c757d;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  font-weight: bold;
  color: #333;
  border-radius: 8px; /* 부모 컨테이너와 맞춤 */
`;

// --- API 기반 캐러셀 컴포넌트 ---

const EventCarousel = ({
  handleLikeToggle,
  searchResult,
  handleSearchResult,
  handleSearchParams,
  searchParams,
  totalCount,
  isExpanded,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrevious = () => {
    const nextOffset = searchParams.offset - 1;
    handleSearchParams((prevState) => ({
      ...prevState,
      offset: nextOffset,
    }));
    setIsLoading(true);
    const payload = {
      categoryId: searchParams.categoryId,
      gu: searchParams.gu,
      title: searchParams.title,
      offset: nextOffset,
      limit: searchParams.limit,
      isOpen: true,
    };
    searchEventByParam(payload);
  };

  const handleNext = () => {
    const nextOffset = searchParams.offset + 1;
    handleSearchParams((prevState) => ({
      ...prevState,
      offset: nextOffset,
    }));
    setIsLoading(true);
    const payload = {
      categoryId: searchParams.categoryId,
      gu: searchParams.gu,
      title: searchParams.title,
      offset: nextOffset,
      limit: searchParams.limit,
      isOpen: true,
    };
    searchEventByParam(payload);
  };

  const searchEventByParam = async (payload) => {
    try {
      const res = await getUpcomingEvents(payload);
      console.log("API 응답:", res);

      if (res && res.data && Array.isArray(res.data.eventList)) {
        const newEvents = res.data.eventList;
        handleSearchResult(newEvents);
      } else {
        console.error("API 응답 형식이 올바르지 않습니다:", res);
      }
    } catch (error) {
      console.error("이벤트 조회 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };
  /*  
  offset -> 0 ? disabled previous
  totalCount == limit disable next

  */

  const isPrevDisabled = isLoading || searchParams.offset === 0;
  const isNextDisabled = isLoading || totalCount === searchParams.offset + 1;

  // --- 렌더링 로직 ---

  return (
    <CarouselWrapper>
      {isExpanded && (
        <>
          <PrevButton
            onClick={handlePrevious}
            disabled={isPrevDisabled}
            aria-label="이전 결과"
          >
            <FiChevronLeft size={24} />
          </PrevButton>
          {searchResult.length > 0 ? (
            searchResult.map((item) => (
              <NoBorderLandscapeCard
                key={item.eventId}
                eventId={item.eventId}
                image={item.imageUrl}
                title={item.title}
                endDate={item.endDate}
                startDate={item.startDate}
                location={item.location}
                category={item.categoryId?.name || "분류 없음"}
                gu={item.gu}
                isLiked={item.isLiked}
                likeCount={item.likeCount}
                onLikeToggle={(event) => handleLikeToggle(event, item.eventId)}
              />
            ))
          ) : (
            <p
              style={{ textAlign: "center", color: "#888", padding: "20px 0" }}
            >
              검색 결과가 없습니다.
            </p>
          )}

          <NextButton
            onClick={handleNext}
            disabled={isNextDisabled}
            aria-label="다음 결과"
          >
            <FiChevronRight size={24} />
          </NextButton>
        </>
      )}
    </CarouselWrapper>
  );
};

export default EventCarousel;
