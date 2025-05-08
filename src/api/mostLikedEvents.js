import apiClient from "./index";

export const fetchMostLikedEvents = async ({ offset = 0, limit = 4 } = {}) => {
  try {
    const response = await apiClient.get("/interaction/event/most/liked", {
      params: { offset, limit }
    });

    if (
      response.data?.status === "SUCCESS" &&
      Array.isArray(response.data?.data?.mostLikedList)
    ) {
      return response.data.data.mostLikedList;
    } else {
      throw new Error(response.data?.message || "가장 인기 있는 행사 조회 실패");
    }
  } catch (error) {
    console.error("🔥 most liked API 호출 에러:", error);
    throw new Error(
      error.response?.data?.message ||
      "서버 오류가 발생했습니다. 인기 행사 목록을 불러오지 못했습니다."
    );
  }
};