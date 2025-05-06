import apiClient from "./index";

// 예약 수정 API (POST)
export const updateUserSchedule = async ({ scheduleId, scheduleTime }) => {
  try {
    const response = await apiClient.post("/interaction/event/schedule/update", {
      scheduleId,
      scheduleTime,
    });

    if (response.data.status === "SUCCESS") {
      console.log("예약 수정 성공:", response.data);
      return response.data.data;
    } else {
      throw new Error(response.data.message || "예약 수정 실패");
    }
  } catch (error) {
    console.error("예약 수정 API 실패:", error);
    throw error;
  }
};

// 예약 삭제 API (POST)
export const deleteUserSchedule = async (scheduleId) => {
    try {
      const response = await apiClient.post(
        "/interaction/event/schedule/delete",
        scheduleId, 
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.data.status === "SUCCESS") {
        console.log("예약 삭제 성공:", response.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message || "예약 삭제 실패");
      }
    } catch (error) {
      console.error("예약 삭제 API 실패:", error);
      throw error;
    }
  };