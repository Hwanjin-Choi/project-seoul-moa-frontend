import apiClient from "./index";

export const logoutUser = async () => {
  try {
    // 로그아웃 API 엔드포인트 호출 시도
    const response = await apiClient.post("/members/logout");
    if (response.data && response.data.status === "SUCCESS") {
      console.log("로그아웃 성공 (API 응답 SUCCESS):", response.data);
      localStorage.removeItem("userData");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("nickname");
      localStorage.removeItem("userId");
      localStorage.removeItem("age");
      localStorage.removeItem("gender");
      localStorage.removeItem("categoryId");
      return response.data;
    } else {
      console.warn(
        "로그아웃 API는 성공했으나, 응답 내용에 오류가 있습니다:",
        response.data
      );
      throw new Error(
        response.data?.message || "로그아웃 응답이 올바르지 않습니다."
      );
    }
  } catch (error) {
    console.error("logoutUser 함수 내 catch 블록 진입:", error);

    if (error.response && error.response.status === 401) {
      console.log(
        "세션 만료 상태에서 로그아웃 시도. apiClient의 전역 핸들러가 사용자 알림을 처리합니다. (logoutUser)"
      );

      throw error; // 원본 오류 객체를 다시 던짐
    } else {
      console.error("로그아웃 중 실제 오류 발생 (401 아님):", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error(
          "서버와 통신할 수 없습니다. 네트워크 연결 상태를 확인해주십시오. (로그아웃 시도 중)"
        );
      } else {
        throw new Error("로그아웃 처리 중 예상치 못한 오류가 발생했습니다.");
      }
    }
  }
};
