import { useEffect, useState, useCallback } from "react";
import { fetchEventReviews } from "../api/eventReview";

const useReviewFetch = (eventId, limit = 5) => {
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMoreReviews = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const data = await fetchEventReviews({ eventId, offset, limit });

      const formatted = data.reviewList.map((r) => ({
        calendarDay: r.calendarDay,
        userNickname: r.userNickname,
        reviewContent: r.content,
      }));

      setReviews((prev) => [...prev, ...formatted]);
      setOffset((prev) => prev + limit);
      setHasMore(formatted.length === limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [eventId, offset, limit, hasMore, loading]);

  useEffect(() => {
    setReviews([]);
    setOffset(0);
    setHasMore(true);
    fetchMoreReviews();
  }, [eventId]);

  return { reviews, fetchMoreReviews, hasMore, loading };
};

export default useReviewFetch;