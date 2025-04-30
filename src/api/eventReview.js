import apiClient from "./index";

export const fetchEventReviews = async ({ eventId, offset, limit }) => {
  try {
    const res = await apiClient.get(
      "/interaction/event/reviews/event",
      {
        params: { eventId, offset, limit }
      }
    );

    if (res.data.status === "SUCCESS") {
      return res.data.data;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    console.error("리뷰 불러오기 실패:", err);
    throw err;
  }
};
