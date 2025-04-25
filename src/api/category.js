// src/api/categories.js
import apiClient from "./index";

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    if (
      response.data &&
      response.data.status === "SUCCESS" &&
      Array.isArray(response.data.data)
    ) {
      return response.data.data;
    } else {
      console.error("API 응답 데이터 형식이 올바르지 않습니다:", response.data);
      throw new Error(
        response.data.message || "카테고리 데이터를 가져오는데 실패했습니다."
      );
    }
  } catch (error) {
    console.error("카테고리 API 호출 중 에러 발생:", error);
    throw new Error("카테고리 목록을 불러오는 중 문제가 발생했습니다.");
  }
};
