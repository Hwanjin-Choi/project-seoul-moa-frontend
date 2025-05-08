import React, { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { postToggleEventLike } from "../../api/interaction/event/like";
import { getSavedEvents } from "../../api/event/liked";
import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

const SavedEventsContainer = styled.div`
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

const ITEMS_PER_PAGE = 10;

const SavedEventsSection = () => {
  const [savedEventsField, setSavedEventsField] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategoryId, setCurrentCategoryId] = useState([]);
  const isOpen = true;
  const mountedRef = useRef(false);
  const loadMoreItemsActionRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    const storedCategoryId =
      JSON.parse(localStorage.getItem("categoryId")) || [];
    setCurrentCategoryId(storedCategoryId);
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
        categoryId: currentCategoryId,
        offset: pageToFetch,
        limit: ITEMS_PER_PAGE,
        isOpen: isOpen,
      };

      try {
        const res = await getSavedEvents(payload);
        console.log(res, payload);
        if (!mountedRef.current) return;

        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          const totalPages = res.data.totalPages;

          setSavedEventsField((prevEvents) =>
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
        console.error("SavedEventsSection - 이벤트 조회 중 오류 발생:", error);
        setHasMore(false);
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [
      isOpen,
      currentCategoryId,
      setIsLoading,
      setSavedEventsField,
      setHasMore,
      setCurrentPage,
      getSavedEvents,
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
    setSavedEventsField([]);
    setCurrentPage(0);
    setHasMore(true);

    fetchPageEvents(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikeToggle = async (eventId) => {
    const eventIndex = savedEventsField.findIndex(
      (event) => event.eventId === eventId
    );
    if (eventIndex === -1) return;

    const originalEvents = [...savedEventsField];
    setSavedEventsField((prevEvents) =>
      prevEvents.filter((event) => event.eventId !== eventId)
    );

    try {
      const res = await postToggleEventLike(eventId);
      if (!mountedRef.current) return;
      if (res !== "SUCCESS") {
        setSavedEventsField(originalEvents);
      } else {
        setCurrentPage(0);
        setHasMore(true);
        fetchPageEvents(0);
      }
    } catch (error) {
      if (!mountedRef.current) return;
      console.error("SavedEventsSection - 좋아요 토글 중 오류 발생:", error);
      setSavedEventsField(originalEvents);
    }
  };

  const scrollableContainerId = "saved-events-scrollable-list";

  return (
    <SavedEventsContainer>
      {savedEventsField.length === 0 && !isLoading && !hasMore ? (
        <EmptyStateMessage>저장된 문화행사가 없습니다.</EmptyStateMessage>
      ) : (
        <EventList id={scrollableContainerId}>
          <InfiniteScroll
            dataLength={savedEventsField.length}
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
              savedEventsField.length > 0 && !hasMore ? (
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: Color.N2,
                  }}
                >
                  <b>모든 저장된 행사를 다 보셨습니다.</b>
                </p>
              ) : null
            }
          >
            {savedEventsField.map((item) => (
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
        </EventList>
      )}
    </SavedEventsContainer>
  );
};

export default SavedEventsSection;
