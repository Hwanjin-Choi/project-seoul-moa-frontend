import apiClient from "./index";

export const deleteUserReview = async (reviewId) => {
    try {
        const response = await apiClient.post(`/interaction/event/review/delete/${reviewId}`);

        if (response.data && response.data.status === "SUCCESS") {
            console.log("리뷰 삭제 성공:", response.data);
            return response.data;
        } else {
            throw new Error(response.data.message || "리뷰 삭제에 실패했습니다.");
        }
    } catch (error) {
        console.error("리뷰 삭제 API 에러:", error);

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.request) {
            throw new Error("서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요.");
        } else {
            throw new Error("리뷰 삭제 요청 중 알 수 없는 오류가 발생했습니다.");
        }
    }
};
