import React, { useState, useEffect, useCallback, useRef } from "react";
import { getRecentlyReviewedEvents } from "../../api/event/recently/reviewed";
import { postToggleEventLike } from "../../api/interaction/event/like";

import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

// ReviewedEventsContainer, ReviewList, LoadingIndicator, EmptyStateMessage styled-components는 동일하게 유지됩니다.
const ReviewedEventsContainer = styled.div`
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

const ReviewList = styled.div`
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

const RecentlyReviewedEventsSection = () => {
  const [recentlyReviewedEventsField, setRecentlyReviewedEventsField] =
    useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchLimitTracker, setFetchLimitTracker] = useState(ITEMS_PER_PAGE);
  const isOpen = true; // 이 값이 동적으로 변경될 수 있다면 state 또는 props로 관리해야 합니다.

  const observer = useRef();
  const reviewListRef = useRef(null); // 스크롤 컨테이너 ref

  const fetchRecentlyReviewedEvents = useCallback(
    async (isInitialLoad = false) => {
      if (isLoading) return;
      if (!isInitialLoad && !hasMore) return;

      setIsLoading(true);
      const offset = isInitialLoad ? 0 : recentlyReviewedEventsField.length;

      const payload = {
        offset: offset,
        limit: ITEMS_PER_PAGE,
        isOpen: isOpen, // API 페이로드에 isOpen 포함
      };

      try {
        const res = await getRecentlyReviewedEvents(payload);
        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          const totalCount = res.data.totalCount;

          setRecentlyReviewedEventsField((prevEvents) =>
            isInitialLoad ? newEvents : [...prevEvents, ...newEvents]
          );

          if (newEvents.length > 0) {
            setFetchLimitTracker((prevTracker) =>
              isInitialLoad ? ITEMS_PER_PAGE : prevTracker + ITEMS_PER_PAGE
            );
          }

          const totalItemsLoaded = offset + newEvents.length;
          setHasMore(totalItemsLoaded < totalCount);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("이벤트 조회 중 오류 발생 (실시간 리뷰):", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMore, isOpen, recentlyReviewedEventsField.length]
  );

  useEffect(() => {
    setRecentlyReviewedEventsField([]);
    setHasMore(true);
    setFetchLimitTracker(ITEMS_PER_PAGE);
    fetchRecentlyReviewedEvents(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // isOpen 값이 변경될 때마다 초기 로드를 다시 실행 (만약 isOpen이 동적이라면)

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchRecentlyReviewedEvents(false);
    }
  }, [isLoading, hasMore, fetchRecentlyReviewedEvents]);

  const lastReviewElementRef = useCallback(
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
          root: reviewListRef.current,
          rootMargin: "0px 0px 100px 0px", // 기존 값 유지
          threshold: 0.01,
        }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, handleLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

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
      const res = await postToggleEventLike(eventId);
      if (res !== "SUCCESS") {
        setRecentlyReviewedEventsField(originalEvents);
      }
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생 (실시간 리뷰):", error);
      setRecentlyReviewedEventsField(originalEvents);
    }
  };

  return (
    <ReviewedEventsContainer>
      {recentlyReviewedEventsField.length === 0 && !isLoading && !hasMore ? (
        <EmptyStateMessage>
          최근 리뷰가 작성된 이벤트가 없습니다.
        </EmptyStateMessage>
      ) : (
        <ReviewList ref={reviewListRef}>
          {recentlyReviewedEventsField.map((item, index) => {
            if (recentlyReviewedEventsField.length === index + 1) {
              return (
                <div ref={lastReviewElementRef} key={item.eventId}>
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
        </ReviewList>
      )}
    </ReviewedEventsContainer>
  );
};

export default RecentlyReviewedEventsSection;
