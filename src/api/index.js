import axios from "axios";
import qs from "qs";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 응답 에러 처리
    console.error("응답 인터셉터 에러 원본:", error);

    if (error.response) {
      const { status, data, config } = error.response;

      if (status === 401) {
        console.warn(
          `401 Unauthorized 에러 감지 (URL: ${config.url}). 세션 만료 또는 인증 실패.`
        );
        localStorage.removeItem("userData");
        localStorage.removeItem("username");
        localStorage.removeItem("nickname");
        localStorage.removeItem("userId");
        localStorage.removeItem("age");
        localStorage.removeItem("gender");
        localStorage.removeItem("categoryId");

        const currentPath = window.location.pathname + window.location.search;

        localStorage.setItem("show_session_expired_modal", true);
        localStorage.setItem("currentPath", currentPath);
        window.location.href = "/expired-session-page";
      } else if (status === 403) {
        console.warn(
          `403 Forbidden 에러 감지 (URL: ${config.url}). 리소스 접근 권한 없음.`
        );
        alert("해당 작업에 대한 권한이 없습니다.");
      } else {
        console.error(
          `[API 에러] 상태: ${status}, URL: ${config.url}, 메시지:`,
          data?.message || error.message
        );
      }
    } else if (error.request) {
      console.error("응답 받지 못함 (네트워크 오류 가능성):", error.request);
      alert("서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.");
    } else {
      console.error("요청 설정 에러:", error.message);
      alert("요청을 보내는 중 문제가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
