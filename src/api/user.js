// src/api/user.js
import apiClient from "./index";

export const updateUserInterests = async (userInfo, selectedCategoryIds) => {
    try {
      if (!userInfo || selectedCategoryIds.length === 0) {
        throw new Error("필수 정보 누락");
      }
  
      const payload = {
        nickname: userInfo.nickname,
        age: userInfo.age,
        gender: userInfo.gender,
        interestIds: selectedCategoryIds,
      };
  
      console.log("🚀 전송할 payload:", payload);
  
      const response = await apiClient.post("/members/update/me", payload);
      return response.data;
    } catch (error) {
      console.error("유저 관심사 업데이트 실패:", error);
      throw new Error("관심사 저장 중 문제가 발생했습니다.");
    }
  };