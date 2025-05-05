import apiClient from "./index";

export const updateUserReview = async ({ reviewId, eventId, content }) => {
  try {
    const res = await apiClient.post(`/interaction/event/review/${reviewId}`, {
      eventId,
      content,
    });
    if (res.data.status === "SUCCESS") {
      return res.data.data;
    } else {
      throw new Error(res.data.message || "리뷰 수정 실패");
    }
  } catch (err) {
    console.error("리뷰 수정 API 실패:", err);
    throw err;
  }
};