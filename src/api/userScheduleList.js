import apiClient from "./index";

export const fetchUserScheduleList = async () => {
  try {
    const res = await apiClient.get("/interaction/event/schedule/list");

    if (res.data?.status === "SUCCESS" && Array.isArray(res.data.data)) {
      return res.data.data;
    } else {
      throw new Error(res.data?.message || "일정 목록 조회에 실패했습니다.");
    }
  } catch (error) {
    console.error("📛 유저 일정 리스트 API 실패:", error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인하세요.");
    } else {
      throw new Error("일정 목록 요청 중 예기치 않은 오류가 발생했습니다.");
    }
  }
};
