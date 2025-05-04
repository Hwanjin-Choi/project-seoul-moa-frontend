import apiClient from "../index";

export const getUpcomingEvents = async (payload) => {
  console.log(payload);
  try {
    const response = await apiClient.get("/events", { params: payload });
    if (response.data && response.data.status === "SUCCESS") {
      return response.data;
    } else {
      throw new Error(
        response.data.message ||
          "알 수 없는 오류로 이벤트를 불러오는데 실패 했습니다"
      );
    }
  } catch (error) {
    console.error("event API 호출 중 에러 발생:", error);

    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error(
        "서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      throw new Error("event 요청 중 오류가 발생했습니다.");
    }
  }
};
