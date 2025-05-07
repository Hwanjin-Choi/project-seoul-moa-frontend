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
    // 정상 응답은 그대로 반환합니다.
    return response;
  },
  (error) => {
    // 응답 에러 처리
    console.error("응답 인터셉터 에러 원본:", error);

    if (error.response) {
      const { status, data, config } = error.response;

      // 401 Unauthorized 에러 (세션 만료 또는 인증 실패)
      if (status === 401) {
        console.warn(
          `401 Unauthorized 에러 감지 (URL: ${config.url}). 세션 만료 또는 인증 실패.`
        );

        // 로컬 스토리지에서 사용자 관련 정보 제거
        localStorage.removeItem("userData");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("nickname");
        localStorage.removeItem("userId");
        localStorage.removeItem("age");
        localStorage.removeItem("gender");
        localStorage.removeItem("categoryId");
        // 참고: 다른 곳에서 관리하는 전역 상태(예: Redux, Zustand)가 있다면 함께 초기화해야 합니다.

        // 현재 경로를 저장하여 로그인 후 돌아올 수 있도록 합니다.
        const currentPath = window.location.pathname + window.location.search;

        window.location.href = `/login-page?show_session_expired_modal=true&redirectUrl=${encodeURIComponent(currentPath)}`;
        //
      } else if (status === 403) {
        // 403 Forbidden 에러 (권한 없음)
        console.warn(
          `403 Forbidden 에러 감지 (URL: ${config.url}). 리소스 접근 권한 없음.`
        );
        alert("해당 작업에 대한 권한이 없습니다.");
        // 필요하다면 특정 페이지로 리디렉션하거나 다른 UI 피드백을 줄 수 있습니다.
      } else {
        // 기타 서버 에러 (500, 404 등)
        console.error(
          `[API 에러] 상태: ${status}, URL: ${config.url}, 메시지:`,
          data?.message || error.message
        );
        // 사용자에게 일반적인 에러 메시지를 보여줄 수 있습니다.
        // alert('요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우 (네트워크 오류 등)
      console.error("응답 받지 못함 (네트워크 오류 가능성):", error.request);
      alert("서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.");
    } else {
      // 요청을 설정하는 중에 에러가 발생한 경우
      console.error("요청 설정 에러:", error.message);
      alert("요청을 보내는 중 문제가 발생했습니다.");
    }

    // 발생한 에러를 계속 전파하여, API를 호출한 곳에서도 개별적인 에러 처리를 할 수 있도록 합니다.
    return Promise.reject(error);
  }
);

export default apiClient;
