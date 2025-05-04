// src/api/weather.js
import apiClient from "./index";

export const fetchWeatherForecast = async (gu) => {
  try {
    const res = await apiClient.get("/weather", {
      params: { gu }
    });
    if (res.data.status === "SUCCESS") {
      return res.data.data;
    }
    throw new Error(res.data.message || "날씨 정보를 가져오지 못했습니다.");
  } catch (e) {
    console.error("weather API 호출 에러:", e);
    throw e;
  }
};
