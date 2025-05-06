import { useState, useEffect, useCallback, useRef } from "react";
import { fetchEventReviews } from "../api/eventReview";

const useReviewFetch = (eventId, limit = 5) => {
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(limit);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchEventReviews({ eventId, offset: 0, limit })
      .then(({ reviewList }) => {
        if (!active) return;
        const formatted = reviewList.map(r => ({
          calendarDay: r.calendarDay,
          userNickname: r.userNickname,
          reviewContent: r.content,
        }));
        setReviews(formatted);
        setHasMore(formatted.length === limit);
      })
      .catch(console.error)
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [eventId, limit]);

  const fetchMore = useCallback(() => {
    if (!hasMore || loading) return;
    setLoading(true);
    fetchEventReviews({ eventId, offset, limit })
      .then(({ reviewList }) => {
        const formatted = reviewList.map(r => ({
          calendarDay: r.calendarDay,
          userNickname: r.userNickname,
          reviewContent: r.content,
        }));
        setReviews(prev => [...prev, ...formatted]);
        setOffset(prev => prev + formatted.length);
        setHasMore(formatted.length === limit);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [eventId, offset, limit, hasMore, loading]);

  return { reviews, fetchMoreReviews: fetchMore, hasMore, loading };
};

export default useReviewFetch;