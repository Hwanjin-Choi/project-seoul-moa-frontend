import apiClient from "./index";

export const fetchUserReviews = async (offset = 0, limit = 5) => {
    try {
        const res = await apiClient.get(`/interaction/event/reviews/user?offset=${offset}&limit=${limit}`);
        if (res.data.status === "SUCCESS") {
            return res.data.data.reviewList;
        } else {
            throw new Error(res.data.message || "리뷰 불러오기 실패");
        }
    } catch (err) {
        console.error("유저 리뷰 API 실패:", err);
        throw err;
    }
};