import React, { useState, useEffect, useCallback } from "react";
import { getUpcomingEvents } from "../../api/event/events";
import { postToggleEventLike } from "../../api/interaction/event/like";

import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard"; // 카드 컴포넌트 경로 가정
import styled from "styled-components"; // 스타일 컴포넌트 사용 시
import Button from "../../components/Button/Button";
import { Color } from "../../styles/colorsheet";

const UpcomingEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 8px 16px;
  color: ${Color.MC1};
  font-weight: 700;
`;

const ScrollableEventListContainer = styled.div`
  max-height: 800px;
  overflow-y: auto;

  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  @media (max-width: 769px) {
    max-height: 400px;
  }
`;

const EmptyStateMessage = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Color.MC1};
  font-weight: 700;
`;

function UpcomingEventsSection() {
  const [upcomingEventsField, setUpcomingEventsField] = useState([]);
  const [limit, setLimit] = useState(3); // 초기 limit 값
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isOpen = true;

  const fetchEventsByLimit = useCallback(
    async (currentLimit, isLoadMore = false) => {
      if (isLoading) return;

      setIsLoading(true);
      const payload = {
        categoryId: JSON.parse(localStorage.getItem("categoryId")) || [],
        offset: 0,
        limit: currentLimit,
        isOpen: isOpen,
      };

      try {
        console.log("API 요청 페이로드:", payload);
        const res = await getUpcomingEvents(payload);
        console.log("API 응답:", res);

        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          setUpcomingEventsField(res.data.eventList);

          if (newEvents.length < 3) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        } else {
          console.error("API 응답 형식이 올바르지 않습니다:", res);
          setHasMore(false);
        }
      } catch (error) {
        console.error("이벤트 조회 중 오류 발생:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isOpen, upcomingEventsField.length]
  );
  useEffect(() => {
    fetchEventsByLimit(3, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    const newLimit = limit + 3;
    setLimit(newLimit);
    fetchEventsByLimit(newLimit, true);
  };

  // 좋아요 토글 핸들러
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
      // API 호출
      const res = await postToggleEventLike(eventId);
      if (res !== "SUCCESS") {
        // 실패 시 롤백
        console.error("Error occured during toggleLikeEvent, rolling back UI.");
        setUpcomingEventsField(originalEvents);
      }
    } catch (error) {
      console.error(
        "Error occured during toggleLikeEvent API call, rolling back UI.",
        error
      );
      setUpcomingEventsField(originalEvents);
    }
  };

  return (
    <UpcomingEventsContainer>
      {upcomingEventsField.length > 0 && (
        <ScrollableEventListContainer>
          {upcomingEventsField.map((item) => (
            <NoBorderLandscapeCard
              key={item.eventId}
              eventId={item.eventId}
              image={item.imageUrl}
              title={item.title}
              endDate={item.endDate}
              startDate={item.startDate}
              location={item.location}
              // category가 객체일 수 있으므로 Optional Chaining 사용
              category={item.categoryId?.name || "분류 없음"}
              gu={item.gu}
              isLiked={item.isLiked}
              likeCount={item.likeCount}
              onLikeToggle={() => handleLikeToggle(item.eventId)}
            />
          ))}
        </ScrollableEventListContainer>
      )}
      {isLoading && <LoadingIndicator>로딩 중...</LoadingIndicator>}

      {/* 더보기 버튼 (로딩 중 아닐 때, 더 로드할 게 있을 때, 이벤트가 하나라도 있을 때) */}
      {!isLoading && hasMore && upcomingEventsField.length > 0 && (
        <Button variant={"text"} onClick={handleLoadMore} disabled={isLoading}>
          더보기
        </Button>
      )}

      {/* 이벤트가 없고 로딩 중도 아닐 때 빈 상태 메시지 */}
      {!isLoading && upcomingEventsField.length === 0 && (
        <EmptyStateMessage>다가오는 이벤트가 없습니다.</EmptyStateMessage>
      )}
    </UpcomingEventsContainer>
  );
}

export default UpcomingEventsSection;
