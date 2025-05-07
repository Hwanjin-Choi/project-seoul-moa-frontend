import React, { useState, useEffect, useCallback, useRef } from "react";
import { postToggleEventLike } from "../../api/interaction/event/like";
import { getSavedEvents } from "../../api/event/liked";
import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

// SavedEventsContainer, EventList, LoadingIndicator, EmptyStateMessage styled-components는 동일하게 유지됩니다.
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

// 한 번에 불러올 아이템 수
const ITEMS_PER_PAGE = 7;

const SavedEventsSection = () => {
  const [savedEventsField, setSavedEventsField] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchLimitTracker, setFetchLimitTracker] = useState(0); // 실제로 불러온 아이템 수를 추적 (초기값 0)

  // categoryId를 localStorage에서 읽어오지만, 이것이 변경될 때마다
  // 목록을 새로고침하려면 state로 관리하고 useEffect 의존성에 추가해야 합니다.
  // 여기서는 isOpen만 예시로 사용합니다.
  const [currentCategoryId, setCurrentCategoryId] = useState([]);
  const isOpen = true;

  const observer = useRef();
  const eventListRef = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 또는 categoryId가 변경될 때 localStorage에서 값을 읽어 state에 설정
    const storedCategoryId =
      JSON.parse(localStorage.getItem("categoryId")) || [];
    setCurrentCategoryId(storedCategoryId);
  }, []); // 앱 로드 시 한 번 또는 categoryId 저장 방식에 따라 다르게 설정 가능

  const fetchEventsByLimit = useCallback(
    async (isInitialLoad = false) => {
      if (isLoading) return;
      if (!isInitialLoad && !hasMore) return;

      setIsLoading(true);
      const currentOffset = isInitialLoad ? 0 : savedEventsField.length;

      const payload = {
        categoryId: currentCategoryId, // 상태에서 categoryId 사용
        offset: currentOffset,
        limit: ITEMS_PER_PAGE,
        isOpen: isOpen,
      };

      try {
        const res = await getSavedEvents(payload);
        if (res && res.data && Array.isArray(res.data.eventList)) {
          const newEvents = res.data.eventList;
          const totalCount = res.data.totalCount;

          if (newEvents.length === 0) {
            // 새로운 이벤트가 없으면 더 이상 로드할 것이 없음
            setHasMore(false);
            if (isInitialLoad) {
              setSavedEventsField([]); // 초기 로드 시 데이터가 없으면 빈 배열로 설정
            }
          } else {
            setSavedEventsField((prevEvents) =>
              isInitialLoad ? newEvents : [...prevEvents, ...newEvents]
            );
            const newTotalLoadedCount = currentOffset + newEvents.length;
            setHasMore(newTotalLoadedCount < totalCount);
          }

          // 실제로 불러온 아이템 수 추적 업데이트
          if (newEvents.length > 0) {
            setFetchLimitTracker(
              (prevTracker) =>
                (isInitialLoad ? 0 : prevTracker) + newEvents.length
            );
          } else if (isInitialLoad && newEvents.length === 0) {
            setFetchLimitTracker(0);
          }
        } else {
          setHasMore(false);
          if (isInitialLoad) setSavedEventsField([]);
        }
      } catch (error) {
        console.error("이벤트 조회 중 오류 발생 (저장된 문화행사):", error);
        setHasMore(false);
        if (isInitialLoad) setSavedEventsField([]);
      } finally {
        setIsLoading(false);
      }
    },
    // 의존성 배열: API 호출에 사용되는 외부 상태값들
    // currentCategoryId, isOpen이 변경되면 함수가 새로 정의되어야 함
    // isLoading, hasMore는 함수 내부에서 상태를 확인하므로 의존성에 포함
    // savedEventsField.length는 함수 내부에서 offset 계산 시 사용되지만,
    // 함수 정의 시점의 length가 아니라 실행 시점의 length를 사용하므로 의존성에서 제외 가능 (루프 방지)
    [isOpen, currentCategoryId, isLoading, hasMore]
  );

  useEffect(() => {
    // isOpen 또는 currentCategoryId가 변경되면 목록을 초기화하고 다시 로드
    setSavedEventsField([]);
    setHasMore(true);
    setFetchLimitTracker(0);
    fetchEventsByLimit(true);
  }, [isOpen, currentCategoryId]); // categoryId가 상태로 관리되므로 의존성 배열에 추가

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchEventsByLimit(false);
    }
  }, [isLoading, hasMore, fetchEventsByLimit]);

  const lastEventElementRef = useCallback(
    (node) => {
      if (isLoading) return; // 로딩 중에는 observer 설정을 스킵
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            // !isLoading 조건 추가
            handleLoadMore();
          }
        },
        {
          root: eventListRef.current,
          rootMargin: "0px 0px 200px 0px",
          threshold: 0.01,
        }
      );

      if (node) observer.current.observe(node);
    },
    // isLoading, hasMore가 변경되면 observer를 재설정할 수 있도록 의존성에 포함
    // handleLoadMore는 fetchEventsByLimit에 의존하고, fetchEventsByLimit은 isLoading, hasMore 등에 의존하므로
    // 이들을 직접 명시하는 것이 더 명확할 수 있음
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
    const eventIndex = savedEventsField.findIndex(
      (event) => event.eventId === eventId
    );

    if (eventIndex === -1) {
      console.warn("Event not found in saved list:", eventId);
      return;
    }

    const currentEvent = savedEventsField[eventIndex];
    const originalEvents = [...savedEventsField];

    if (currentEvent.isLiked) {
      setSavedEventsField((prevEvents) =>
        prevEvents.filter((event) => event.eventId !== eventId)
      );

      try {
        const res = await postToggleEventLike(eventId);

        if (res !== "SUCCESS") {
          console.warn(
            "Failed to unlike event on server (saved list), reverting UI."
          );
          setSavedEventsField(originalEvents);
        } else {
          // 성공적으로 '좋아요' 취소 시, 목록을 새로고침하여 totalCount 등의 변경사항을 반영할 수 있습니다.
          // 또는 단순히 UI에서 제거된 상태를 유지합니다.
          // 예: fetchEventsByLimit(true); // 목록 전체 새로고침
          // 현재는 낙관적 업데이트 후 서버 동기화만 시도하고, 목록 길이에 변화가 있으므로
          // 다음 스크롤 시 offset이 올바르게 계산됩니다.
          // totalCount가 줄어들었다면, hasMore 상태도 다음 fetch 시 올바르게 업데이트될 것입니다.
        }
      } catch (error) {
        console.error("Error unliking event (saved list):", error);
        setSavedEventsField(originalEvents);
      }
    } else {
      console.warn(
        "Attempted to like an event that should already be liked in SavedEventsSection:",
        eventId
      );
    }
  };

  return (
    <SavedEventsContainer>
      {savedEventsField.length === 0 && !isLoading && !hasMore ? (
        <EmptyStateMessage>저장된 문화행사가 없습니다.</EmptyStateMessage>
      ) : (
        <EventList ref={eventListRef}>
          {savedEventsField.map((item, index) => {
            if (savedEventsField.length === index + 1) {
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
    </SavedEventsContainer>
  );
};

export default SavedEventsSection;
