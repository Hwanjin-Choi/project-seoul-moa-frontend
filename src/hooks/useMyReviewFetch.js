import { useState, useEffect, useCallback } from "react";
import { fetchUserReviews } from "../api/userReview";

const useMyReviewFetch = (limit = 5) => {
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 공통 포맷터
  const formatReviewList = (reviewList) =>
    reviewList.map((r) => ({
      reviewId: r.reviewId,
      eventId: r.eventId,
      calendarDay: r.calendarDay,
      eventTitle: r.eventTitle,
      userNickname: r.userNickname,
      reviewContent: r.reviewContent || r.content,
      eventImageurl: r.eventImageurl || r.imageUrl,
    }));

  // 초기 또는 새로고침용 전체 fetch
  const refetchReviews = useCallback(() => {
    setLoading(true);
    fetchUserReviews({ offset: 0, limit })
      .then((reviewList) => {
        const formatted = formatReviewList(reviewList);
        setReviews(formatted);
        setOffset(formatted.length);
        setHasMore(formatted.length === limit);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [limit]);

  // 컴포넌트 최초 로드 시 호출
  useEffect(() => {
    refetchReviews();
  }, [refetchReviews]);

  // 무한 스크롤용 추가 fetch
  const fetchMore = useCallback(() => {
    if (!hasMore || loading) return;

    setLoading(true);
    fetchUserReviews({ offset, limit })
      .then((reviewList) => {
        const formatted = formatReviewList(reviewList);
        setReviews((prev) => [...prev, ...formatted]);
        setOffset((prev) => prev + formatted.length);
        setHasMore(formatted.length === limit);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [offset, limit, hasMore, loading]);

  // 삭제용
  const deleteReview = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
  };

  return {
    reviews,
    fetchMoreReviews: fetchMore,
    refetchReviews, // ✅ 추가됨
    hasMore,
    loading,
    deleteReview,
  };
};

export default useMyReviewFetch;