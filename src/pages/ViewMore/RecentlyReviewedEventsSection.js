import React, { useState, useEffect, useCallback } from "react";
import { getRecentlyReviewedEvents } from "../../api/event/recently/reviewed";
import { postToggleEventLike } from "../../api/interaction/event/like";

import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard"; // 카드 컴포넌트 경로 가정
import styled from "styled-components"; // 스타일 컴포넌트 사용 시

// --- 스타일 컴포넌트 정의 (기존 코드에 있다면 해당 파일에서 import) ---
const UpcomingEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;

const LoadMoreButton = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  align-self: center;
  margin-top: 1rem;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  border-radius: 4px;

  &:hover {
    background-color: #eee;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 1rem;
`;

const ScrollableEventListContainer = styled.div`
  max-height: 800px;
  overflow-y: auto;

  padding-right: 5px;

  /* 스크롤바 디자인 (선택 사항) */
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
  color: #777;
  /* 스크롤 컨테이너 대신 표시될 때 높이를 어느 정도 유지 */
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecentlyReviewedEventsSection = () => {
  const [recentlyReviewedEventsField, setRecentlyReviewedEventsField] =
    useState([]);
  const [limit, setLimit] = useState(3); // 초기 limit 값
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchEventsByLimit = useCallback(
    async (currentLimit, isLoadMore = false) => {
      if (isLoading) return;

      setIsLoading(true);
      const payload = {
        offset: 0,
        limit: currentLimit,
      };

      try {
        console.log("API 요청 페이로드:", payload);
        const res = await getRecentlyReviewedEvents(payload);
        console.log("API 응답:", res);

        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          setRecentlyReviewedEventsField(res.data.eventList);
          setTotalCount(res.data.totalCount);

          if (res.data.totalCount === currentLimit) {
            setHasMore(true);
          } else {
            setHasMore(false);
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
    [isLoading, recentlyReviewedEventsField.length]
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
    const eventIndex = recentlyReviewedEventsField.findIndex(
      (event) => event.eventId === eventId
    );
    if (eventIndex === -1) return;

    const currentEvent = recentlyReviewedEventsField[eventIndex];
    const newLikedStatus = !currentEvent.isLiked;
    const originalEvents = [...recentlyReviewedEventsField];

    setRecentlyReviewedEventsField((prevEvents) =>
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
        setRecentlyReviewedEventsField(originalEvents);
      }
    } catch (error) {
      console.error(
        "Error occured during toggleLikeEvent API call, rolling back UI.",
        error
      );
      setRecentlyReviewedEventsField(originalEvents);
    }
  };

  return (
    <UpcomingEventsContainer>
      {recentlyReviewedEventsField.length > 0 && (
        <ScrollableEventListContainer>
          {recentlyReviewedEventsField.map((item) => (
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
      {!isLoading && hasMore && recentlyReviewedEventsField.length > 0 && (
        <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
          더보기
        </LoadMoreButton>
      )}

      {/* 이벤트가 없고 로딩 중도 아닐 때 빈 상태 메시지 */}
      {!isLoading && recentlyReviewedEventsField.length === 0 && (
        <EmptyStateMessage>
          최근의 리뷰가 작성된 이벤트가 없습니다.
        </EmptyStateMessage>
      )}
    </UpcomingEventsContainer>
  );
};

export default RecentlyReviewedEventsSection;
