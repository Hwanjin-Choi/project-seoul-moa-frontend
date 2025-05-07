import React, { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component"; // 라이브러리 임포트
import { postToggleEventLike } from "../../api/interaction/event/like";
import { getSavedEvents } from "../../api/event/liked";
import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

// Styled-components (SavedEventsContainer, EventList, LoadingIndicator, EmptyStateMessage)는 기존과 동일
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

const ITEMS_PER_PAGE = 7;

const SavedEventsSection = () => {
  const [savedEventsField, setSavedEventsField] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [currentCategoryId, setCurrentCategoryId] = useState([]);
  const isOpen = true;
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const storedCategoryId =
      JSON.parse(localStorage.getItem("categoryId")) || [];
    setCurrentCategoryId(storedCategoryId);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchSavedEvents = useCallback(
    async (isInitialLoad = false) => {
      if (!mountedRef.current) return;
      if (isLoading && !isInitialLoad) return;
      if (!isInitialLoad && !hasMore) return;

      setIsLoading(true);
      const currentOffset = isInitialLoad ? 0 : savedEventsField.length;
      console.log(currentOffset, "check from saved");

      const payload = {
        categoryId: currentCategoryId,
        offset: currentOffset,
        limit: ITEMS_PER_PAGE,
        isOpen: isOpen,
      };

      try {
        const res = await getSavedEvents(payload);
        if (!mountedRef.current) return;

        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          const totalCount = res.data.totalCount;

          setSavedEventsField((prevEvents) =>
            isInitialLoad ? newEvents : [...prevEvents, ...newEvents]
          );

          const totalItemsLoaded = currentOffset + newEvents.length;
          setHasMore(totalItemsLoaded < totalCount);
          if (isInitialLoad) {
            setPage(1);
          } else if (newEvents.length > 0) {
            // 새 이벤트가 있을 때만 페이지 증가
            setPage((prevPage) => prevPage + 1);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("이벤트 조회 중 오류 발생 (저장된 문화행사):", error);
        setHasMore(false);
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [isLoading, hasMore, isOpen, currentCategoryId, savedEventsField.length]
  );

  useEffect(() => {
    setSavedEventsField([]);
    setHasMore(true);
    setPage(0);
    fetchSavedEvents(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentCategoryId]);

  const handleLikeToggle = async (eventId) => {
    // 좋아요 취소 시 목록에서 제거하는 로직은 유지
    const eventIndex = savedEventsField.findIndex(
      (event) => event.eventId === eventId
    );
    if (eventIndex === -1) return;

    const originalEvents = [...savedEventsField];
    // UI에서 먼저 제거 (낙관적 업데이트)
    setSavedEventsField((prevEvents) =>
      prevEvents.filter((event) => event.eventId !== eventId)
    );

    try {
      const res = await postToggleEventLike(eventId);
      if (res !== "SUCCESS") {
        // 실패 시 롤백
        if (mountedRef.current) setSavedEventsField(originalEvents);
        console.warn(
          "Failed to unlike event on server (saved list), reverting UI."
        );
      }
      // 성공 시, totalCount가 변경될 수 있으므로 목록을 새로고침하거나 hasMore를 재계산 할 수 있습니다.
      // 여기서는 간단히 UI 업데이트를 유지하고, 다음 스크롤 시 hasMore가 API 응답에 따라 결정되도록 합니다.
      // 만약 목록에서 아이템이 제거된 후 즉시 hasMore 상태를 정확히 반영하고 싶다면,
      // 여기서 fetchSavedEvents(true)를 호출하여 목록을 완전히 새로고침 할 수 있습니다.
      // 또는, totalCount를 상태로 관리하고 직접 감소시키는 방법도 있습니다.
      // 현재는 다음 fetch 시 hasMore가 업데이트되도록 둡니다.
    } catch (error) {
      console.error("Error unliking event (saved list):", error);
      if (mountedRef.current) setSavedEventsField(originalEvents);
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
            next={() => fetchSavedEvents(false)}
            hasMore={hasMore}
            loader={
              <LoadingIndicator>
                <span>로딩 중...</span>
              </LoadingIndicator>
            }
            scrollableTarget={scrollableContainerId}
            endMessage={
              savedEventsField.length > 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: Color.N2,
                  }}
                >
                  <b>모든 저장된 이벤트를 다 보셨습니다.</b>
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
                gu={item.gu}
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
