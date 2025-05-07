import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component"; // 라이브러리 임포트
import { getUpcomingEvents } from "../../api/event/events";
import { postToggleEventLike } from "../../api/interaction/event/like";

import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

// Styled-components (UpcomingEventsContainer, EventList, LoadingIndicator, EmptyStateMessage)는 기존과 동일
const UpcomingEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  @media (min-width: 769px) {
    padding: 0;
  }
`;

const EventList = styled.div`
  flex-grow: 1;
  overflow-y: auto; // InfiniteScroll 컴포넌트가 이 요소를 스크롤 대상으로 삼도록 id 추가
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 2.5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  @media (min-width: 769px) {
    padding-right: 5px;
    &::-webkit-scrollbar {
      width: 6px;
    }
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 16px;
  color: ${Color.MC1};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const EmptyStateMessage = styled.div`
  text-align: center;
  padding: 32px 16px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${Color.MC1};
  font-weight: 500;
  height: 100%;
`;

const ITEMS_PER_PAGE = 7;

function UpcomingEventsSection() {
  const [upcomingEventsField, setUpcomingEventsField] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 여전히 로딩 상태 관리에 사용 가능
  const [hasMore, setHasMore] = useState(true);
  // fetchLimitTracker는 라이브러리 사용 시 직접적인 역할이 줄어들 수 있으나, API 페이징 추적용으로 유지 가능
  const [page, setPage] = useState(0); // 페이지 번호 또는 offset 관리용 상태
  const [currentCategoryId, setCurrentCategoryId] = useState([]); // categoryId 상태 관리
  const isOpen = true;

  useEffect(() => {
    // localStorage에서 categoryId를 읽어와 상태에 설정
    const storedCategoryId =
      JSON.parse(localStorage.getItem("categoryId")) || [];
    setCurrentCategoryId(storedCategoryId);
  }, []);

  const fetchEvents = useCallback(
    async (isInitialLoad = false) => {
      if (isLoading && !isInitialLoad) return; // 초기 로드가 아닐 때만 로딩 중복 방지
      if (!isInitialLoad && !hasMore) return;

      setIsLoading(true);

      const currentOffset = isInitialLoad ? 0 : upcomingEventsField.length;

      const payload = {
        categoryId: currentCategoryId,
        offset: currentOffset,
        limit: ITEMS_PER_PAGE,
        isOpen: isOpen,
      };

      try {
        const res = await getUpcomingEvents(payload);
        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          const totalCount = res.data.totalCount;

          setUpcomingEventsField((prevEvents) =>
            isInitialLoad ? newEvents : [...prevEvents, ...newEvents]
          );

          const totalItemsLoaded = currentOffset + newEvents.length;
          setHasMore(totalItemsLoaded < totalCount);
          if (isInitialLoad) {
            setPage(1); // 초기 로드 후 페이지 1로 설정 (또는 offset에 따라)
          } else {
            setPage((prevPage) => prevPage + 1);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("이벤트 조회 중 오류 발생 (다가오는 문화행사):", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMore, isOpen, currentCategoryId, upcomingEventsField.length]
  ); // upcomingEventsField.length 추가

  // 초기 데이터 로드
  useEffect(() => {
    setUpcomingEventsField([]);
    setHasMore(true);
    setPage(0); // 페이지(또는 offset 관련 상태) 초기화
    fetchEvents(true); // isInitialLoad = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentCategoryId]); // categoryId가 변경되면 초기 로드 다시 실행

  const handleLikeToggle = async (eventId) => {
    const eventIndex = upcomingEventsField.findIndex(
      (event) => event.eventId === eventId
    );
    if (eventIndex === -1) return;

    const currentEvent = upcomingEventsField[eventIndex];
    const newLikedStatus = !currentEvent.isLiked;
    const originalEvents = [...upcomingEventsField];

    setUpcomingEventsField((prevEvents) =>
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
      const res = await postToggleEventLike(eventId);
      if (res !== "SUCCESS") {
        setUpcomingEventsField(originalEvents);
      }
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
      setUpcomingEventsField(originalEvents);
    }
  };

  // EventList에 id를 부여하여 scrollableTarget으로 사용
  const scrollableContainerId = "upcoming-events-scrollable-list";

  return (
    <UpcomingEventsContainer>
      {/* 초기 로딩 전이나, 데이터가 없을 때 EmptyStateMessage 표시 로직은 유지 또는 조정 가능 */}
      {/* 라이브러리는 주로 목록 내 스크롤을 다루므로, 전체 섹션이 비었을 때의 처리는 별도 필요 */}
      {upcomingEventsField.length === 0 && !isLoading && !hasMore ? (
        <EmptyStateMessage>다가오는 이벤트가 없습니다.</EmptyStateMessage>
      ) : (
        <EventList id={scrollableContainerId}>
          <InfiniteScroll
            dataLength={upcomingEventsField.length}
            next={() => fetchEvents(false)} // isInitialLoad = false
            hasMore={hasMore}
            loader={
              <LoadingIndicator>
                <span>로딩 중...</span>
              </LoadingIndicator>
            }
            scrollableTarget={scrollableContainerId} // EventList의 id를 지정
            endMessage={
              upcomingEventsField.length > 0 ? ( // 데이터가 있을 때만 endMessage 표시
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: Color.N2,
                  }}
                >
                  <b>모든 이벤트를 다 보셨습니다.</b>
                </p>
              ) : null
            }
          >
            {upcomingEventsField.map((item) => (
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
                onLikeToggle={() => handleLikeToggle(item.eventId)}
              />
            ))}
          </InfiniteScroll>
        </EventList>
      )}
      {/* isLoading && upcomingEventsField.length === 0 경우의 로딩 인디케이터는 InfiniteScroll의 loader로 통합됨 */}
    </UpcomingEventsContainer>
  );
}

export default UpcomingEventsSection;
