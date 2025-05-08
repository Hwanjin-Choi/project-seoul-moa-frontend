import React, { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getRecentlyReviewedEvents } from "../../api/event/recently/reviewed";
import { postToggleEventLike } from "../../api/interaction/event/like";

import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

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

const ITEMS_PER_PAGE = 10;

const RecentlyReviewedEventsSection = () => {
  const [recentlyReviewedEventsField, setRecentlyReviewedEventsField] =
    useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const isOpen = true;
  const mountedRef = useRef(false);
  const loadMoreItemsActionRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchPageEvents = useCallback(
    async (pageToFetch) => {
      if (!mountedRef.current) return;
      if (isLoading && currentPage === pageToFetch + 1 && pageToFetch !== 0)
        return;
      if (pageToFetch > 0 && !hasMore) return;

      setIsLoading(true);
      const payload = {
        offset: pageToFetch,
        limit: ITEMS_PER_PAGE,
        isOpen: isOpen,
      };

      try {
        const res = await getRecentlyReviewedEvents(payload);
        if (!mountedRef.current) return;

        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          const totalPages = res.data.totalPages;

          setRecentlyReviewedEventsField((prevEvents) =>
            pageToFetch === 0 ? newEvents : [...prevEvents, ...newEvents]
          );

          const morePagesExistBasedOnResponse = pageToFetch < totalPages - 1;
          setHasMore(morePagesExistBasedOnResponse);

          if (newEvents.length > 0) {
            setCurrentPage(pageToFetch + 1);
          } else {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        if (!mountedRef.current) return;
        console.error(
          "RecentlyReviewedEventsSection - 이벤트 조회 중 오류 발생:",
          error
        );
        setHasMore(false);
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [
      isOpen,
      setIsLoading,
      setRecentlyReviewedEventsField,
      setHasMore,
      setCurrentPage,
      getRecentlyReviewedEvents,
      hasMore,
      isLoading,
      currentPage,
    ]
  );

  useEffect(() => {
    loadMoreItemsActionRef.current = () => {
      if (!isLoading && hasMore && mountedRef.current) {
        fetchPageEvents(currentPage);
      }
    };
  }, [isLoading, hasMore, currentPage, fetchPageEvents]);

  useEffect(() => {
    if (!mountedRef.current) return;
    setRecentlyReviewedEventsField([]);
    setCurrentPage(0);
    setHasMore(true);
    fetchPageEvents(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleLikeToggle = async (eventId) => {
    const eventIndex = recentlyReviewedEventsField.findIndex(
      (event) => event.eventId === eventId
    );
    if (eventIndex === -1) return;

    const originalEvents = [...recentlyReviewedEventsField];
    setRecentlyReviewedEventsField((prevEvents) =>
      prevEvents.map((event) =>
        event.eventId === eventId
          ? {
              ...event,
              isLiked: !event.isLiked,
              likeCount: !event.isLiked
                ? event.likeCount + 1
                : Math.max(0, event.likeCount - 1),
            }
          : event
      )
    );

    try {
      const res = await postToggleEventLike(eventId);
      if (!mountedRef.current) return;
      if (res !== "SUCCESS") {
        setRecentlyReviewedEventsField(originalEvents);
      }
    } catch (error) {
      if (!mountedRef.current) return;
      console.error(
        "RecentlyReviewedEventsSection - 좋아요 토글 중 오류 발생:",
        error
      );
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
            next={() =>
              loadMoreItemsActionRef.current && loadMoreItemsActionRef.current()
            }
            hasMore={hasMore}
            loader={
              <LoadingIndicator>
                <span>로딩 중...</span>
              </LoadingIndicator>
            }
            scrollableTarget={scrollableContainerId}
            endMessage={
              recentlyReviewedEventsField.length > 0 && !hasMore ? (
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: Color.N2,
                  }}
                >
                  <b>최근 리뷰가 작성된 행사를 다 보셨습니다.</b>
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
                gu={item.location?.gu || ""}
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
