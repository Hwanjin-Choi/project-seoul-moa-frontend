import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component"; // 라이브러리 임포트
import { getRecentlyReviewedEvents } from "../../api/event/recently/reviewed";
import { postToggleEventLike } from "../../api/interaction/event/like";

import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

// Styled-components (ReviewedEventsContainer, ReviewList, LoadingIndicator, EmptyStateMessage)는 기존과 동일
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

const ITEMS_PER_PAGE = 7;

const RecentlyReviewedEventsSection = () => {
  const [recentlyReviewedEventsField, setRecentlyReviewedEventsField] =
    useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const isOpen = true;

  const fetchRecentlyReviewedEvents = useCallback(
    async (isInitialLoad = false) => {
      if (isLoading && !isInitialLoad) return;
      if (!isInitialLoad && !hasMore) return;

      setIsLoading(true);
      const currentOffset = isInitialLoad
        ? 0
        : recentlyReviewedEventsField.length;

      const payload = {
        offset: currentOffset,
        limit: ITEMS_PER_PAGE,
        isOpen: isOpen,
      };

      try {
        const res = await getRecentlyReviewedEvents(payload);
        console.log(res);
        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          const totalCount = res.data.totalCount;

          setRecentlyReviewedEventsField((prevEvents) =>
            isInitialLoad ? newEvents : [...prevEvents, ...newEvents]
          );

          const totalItemsLoaded = currentOffset + newEvents.length;
          setHasMore(totalItemsLoaded < totalCount);
          if (isInitialLoad) {
            setPage(1);
          } else {
            setPage((prevPage) => prevPage + 1);
          }
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
    setPage(0);
    fetchRecentlyReviewedEvents(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  const scrollableContainerId = "recently-reviewed-scrollable-list";

  return (
    <ReviewedEventsContainer>
      {recentlyReviewedEventsField.length === 0 && !isLoading && !hasMore ? (
        <EmptyStateMessage>
          최근 리뷰가 작성된 이벤트가 없습니다.
        </EmptyStateMessage>
      ) : (
        <ReviewList id={scrollableContainerId}>
          <InfiniteScroll
            dataLength={recentlyReviewedEventsField.length}
            next={() => fetchRecentlyReviewedEvents(false)}
            hasMore={hasMore}
            loader={
              <LoadingIndicator>
                <span>로딩 중...</span>
              </LoadingIndicator>
            }
            scrollableTarget={scrollableContainerId}
            endMessage={
              recentlyReviewedEventsField.length > 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: Color.N2,
                  }}
                >
                  <b>모든 리뷰를 다 보셨습니다.</b>
                </p>
              ) : null
            }
          >
            {recentlyReviewedEventsField.map((item) => (
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
        </ReviewList>
      )}
    </ReviewedEventsContainer>
  );
};

export default RecentlyReviewedEventsSection;
