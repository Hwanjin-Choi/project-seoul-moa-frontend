import React, { useState, useEffect, useCallback, useRef } from "react";
import { getUpcomingEvents } from "../../api/event/events";
import { postToggleEventLike } from "../../api/interaction/event/like";

import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

// UpcomingEventsContainer, EventList, LoadingIndicator, EmptyStateMessage styled-components는 동일하게 유지됩니다.
// ... (기존 styled-components 코드 생략)
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
  overflow-y: auto;
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

// 한 번에 불러올 아이템 수
const ITEMS_PER_PAGE = 7;

function UpcomingEventsSection() {
  const [upcomingEventsField, setUpcomingEventsField] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchLimitTracker, setFetchLimitTracker] = useState(ITEMS_PER_PAGE); // 초기값은 첫 페이지 아이템 수
  const isOpen = true; // 예시 값

  const observer = useRef();
  const eventListRef = useRef(null); // 스크롤 컨테이너 ref

  const fetchEvents = useCallback(
    async (isInitialLoad = false) => {
      if (isLoading) return; // 로딩 중이면 중복 호출 방지
      if (!isInitialLoad && !hasMore) return; // 더 이상 데이터가 없으면 호출 방지

      setIsLoading(true);

      // offset 계산: 첫 로드면 0, 아니면 현재까지 로드된 아이템 수
      const offset = isInitialLoad ? 0 : upcomingEventsField.length;

      const payload = {
        categoryId: JSON.parse(localStorage.getItem("categoryId")) || [],
        offset: offset,
        limit: ITEMS_PER_PAGE, // API 요청 시 항상 고정된 수의 아이템 요청
        isOpen: isOpen,
      };

      try {
        const res = await getUpcomingEvents(payload);
        console.log(res);
        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          const totalCount = res.data.totalCount;

          setUpcomingEventsField((prevEvents) =>
            isInitialLoad ? newEvents : [...prevEvents, ...newEvents]
          );

          // 새 이벤트가 실제로 추가되었을 때만 fetchLimitTracker를 업데이트합니다.
          if (newEvents.length > 0) {
            // 이 상태는 '지금까지 성공적으로 요청된 총 아이템 수'를 나타내도록 합니다.
            // 첫 로드 시: ITEMS_PER_PAGE (예: 7)
            // 다음 로드 시: 이전 값 + ITEMS_PER_PAGE (예: 7 + 7 = 14)
            setFetchLimitTracker((prevTracker) =>
              isInitialLoad ? ITEMS_PER_PAGE : prevTracker + ITEMS_PER_PAGE
            );
          }

          // hasMore 상태 업데이트: 현재까지 불러온 아이템 수와 전체 아이템 수를 비교
          const totalItemsLoaded = offset + newEvents.length;
          setHasMore(totalItemsLoaded < totalCount);
        } else {
          // API 응답 형식이 다르거나 데이터가 없는 경우
          setHasMore(false);
        }
      } catch (error) {
        console.error("이벤트 조회 중 오류 발생 (다가오는 문화행사):", error);
        setHasMore(false); // 에러 발생 시 더 이상 시도하지 않도록 설정
      } finally {
        setIsLoading(false);
      }
    },

    [isLoading, hasMore, isOpen, upcomingEventsField.length]
  );

  // 초기 데이터 로드 (컴포넌트 마운트 시 또는 isOpen 같은 주요 필터 변경 시)
  useEffect(() => {
    setUpcomingEventsField([]); // 필터 변경 시 기존 목록 초기화
    setHasMore(true); // 다시 로드 시작이므로 hasMore 초기화
    setFetchLimitTracker(ITEMS_PER_PAGE); // fetchLimitTracker도 초기화
    fetchEvents(true); // isInitialLoad = true 로 첫 데이터 요청
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // isOpen 값이 변경될 때마다 초기 로드를 다시 실행

  const handleLoadMore = useCallback(() => {
    // isLoading, hasMore 상태는 fetchEvents 내부에서도 체크하지만,
    // 여기서 한 번 더 체크하여 불필요한 함수 호출 자체를 줄일 수 있습니다.
    if (!isLoading && hasMore) {
      fetchEvents(false); // isInitialLoad = false 로 추가 데이터 요청
    }
  }, [isLoading, hasMore, fetchEvents]);

  const lastEventElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            handleLoadMore();
          }
        },
        {
          root: eventListRef.current, // 스크롤 감지 대상 컨테이너
          rootMargin: "0px 0px 200px 0px",
          threshold: 0.01,
        }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, handleLoadMore] // handleLoadMore가 의존성으로 추가됨
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

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

  return (
    <UpcomingEventsContainer>
      {upcomingEventsField.length === 0 && !isLoading && !hasMore ? (
        <EmptyStateMessage>다가오는 이벤트가 없습니다.</EmptyStateMessage>
      ) : (
        <EventList ref={eventListRef}>
          {upcomingEventsField.map((item, index) => {
            // 마지막 요소에 ref를 연결하여 IntersectionObserver가 감지하도록 설정
            if (upcomingEventsField.length === index + 1) {
              return (
                <div ref={lastEventElementRef} key={item.eventId}>
                  <NoBorderLandscapeCard
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
                </div>
              );
            } else {
              return (
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
              );
            }
          })}
          {isLoading && (
            <LoadingIndicator>
              <span>로딩 중...</span>
            </LoadingIndicator>
          )}
        </EventList>
      )}
    </UpcomingEventsContainer>
  );
}

export default UpcomingEventsSection;
