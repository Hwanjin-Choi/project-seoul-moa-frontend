import { useState, useEffect, useCallback } from "react";
import { fetchUserReviews } from "../api/userReview";

const useMyReviewFetch = (limit = 5) => {
    const [reviews, setReviews] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // 초기 리뷰 로드
    useEffect(() => {
        let active = true;
        setLoading(true);
        fetchUserReviews({ offset: 0, limit })
            .then((reviewList) => {
                if (!active) return;
                const formatted = reviewList.map((r) => ({
                    eventId: r.eventId,
                    reviewId: r.reviewId,
                    calendarDay: r.calendarDay,
                    eventTitle: r.eventTitle,
                    userNickname: r.userNickname,
                    reviewContent: r.reviewContent || r.content,
                    eventImageurl: r.eventImageurl || r.imageUrl,
                }));
                setReviews(formatted);
                setHasMore(formatted.length === limit);
                setOffset(formatted.length);
            })
            .catch(console.error)
            .finally(() => active && setLoading(false));

        return () => {
            active = false;
        };
    }, [limit]);

    // 무한 스크롤용 fetchMore
    const fetchMore = useCallback(() => {
        if (!hasMore || loading) return;

        setLoading(true);
        fetchUserReviews({ offset, limit })
            .then((reviewList) => {
                const formatted = reviewList.map((r) => ({
                    reviewId: r.reviewId,
                    eventId: r.eventId,
                    calendarDay: r.calendarDay,
                    eventTitle: r.eventTitle,
                    userNickname: r.userNickname,
                    reviewContent: r.reviewContent || r.content,
                    eventImageurl: r.eventImageurl || r.imageUrl,
                }));
                setReviews((prev) => [...prev, ...formatted]);
                setOffset((prev) => prev + formatted.length);
                setHasMore(formatted.length === limit);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [offset, limit, hasMore, loading]);

    // 삭제용 헬퍼
    const deleteReview = (reviewId) => {
        setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
    };

    return {
        reviews,
        fetchMoreReviews: fetchMore,
        hasMore,
        loading,
        deleteReview,
    };
};

export default useMyReviewFetch;