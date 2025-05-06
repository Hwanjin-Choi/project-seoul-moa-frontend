// src/api/schedule.js
import apiClient from "./index";

export const scheduleEvent = async ({ eventId, scheduleTime }) => {
  try {
    const response = await apiClient.post(
      "/interaction/event/schedule",
      { eventId, scheduleTime }
    );

    if (response.data && response.data.status === "SUCCESS") {
      return response.data;
    } else {
      throw new Error(
        response.data.message || "일정 추가에 실패했습니다."
      );
    }
  } catch (error) {
    console.error("일정 추가 API 호출 중 에러 발생:", error);

    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error(
        "서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      throw new Error("일정 추가 요청 중 오류가 발생했습니다.");
    }
  }
};