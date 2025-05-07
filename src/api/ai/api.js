import apiClient from "../chatbot";

export const dummyApiResponse = {
  success: true,
  meta: {
    queryDate: "2025-05-05",
    limit: 3,
    returned: 3,
    timestamp: "2025-05-05T09:35:10.362537",
  },
  data: [
    {
      event_id: "1508",
      title:
        "[서울시립 북서울미술관] 2024 유휴공간 전시 《멀리서 손바닥으로, 반짝》",
      category: "미술전시",
      location: {
        name: "서울시립 북서울미술관 1층 야외광장, 2층 유휴공간-",
        gu: "노원구",
        station: "하계역역",
      },
      start_date: "2024-12-17",
      end_date: "2025-08-17",
      description_summary:
        "서울시립 북서울미술관은 2024년 12월 17일부터 2025년 8월 17일까지 2층 유휴공간과 야외에서 하반기 유휴공간 전시를 개최합니다.",
    },
    {
      event_id: "1508",
      title:
        "[서울시립 북서울미술관] 2024 유휴공간 전시 《멀리서 손바닥으로, 반짝》",
      category: "미술전시",
      location: {
        name: "서울시립 북서울미술관 1층 야외광장, 2층 유휴공간-",
        gu: "노원구",
        station: "하계역역",
      },
      start_date: "2024-12-17",
      end_date: "2025-08-17",
      description_summary:
        "서울시립 북서울미술관은 2024년 12월 17일부터 2025년 8월 17일까지 2층 유휴공간과 야외에서 하반기 유휴공간 전시를 개최합니다.",
    },
    {
      event_id: "554",
      title:
        "[마포구립서강도서관] 4-5월 어린이갤러리 [이야기 귀신이 와르릉 와르릉] 아트프린트 전시",
      category: "미술전시",
      location: {
        name: "마포구립서강도서관 4층 어린이자료실-",
        gu: "마포구",
        station: "광흥창역역",
      },
      start_date: "2025-04-02",
      end_date: "2025-05-31",
      description_summary:
        "『이야기 귀신이 와르릉 와르릉』은 천효정이 쓴 글과 최미란이 그린 그림으로 구성된 어린이 갤러리입니다. 이 갤러리는 2025년 4월 2일부터 5월 31일까지 4층 어린이자료실에서 열립니다. 이야기를 좋아하는 아이가 오래된 이야기 속에 갇힌 여섯 이야기 귀신을 만나며 펼쳐지는 신나는 이야기입니다. 글쓴이 천효정은 충남 서천 출신으로 교사로 일하고 있으며, 문학동네 어린이문학상과 스토리킹 수상작을 가지고 있습니다. 그린이 최미란은 서울시립대학교에서 산업디자인과 일러스트레이션을 전공한 일러스트레이터로, 라가치상 픽션 부문 스페셜 멘션을 받았고 다양한 그림책과 동화에 그림을 그렸습니다.",
    },
  ],
  result:
    "저는 당신이 우울한 상태라는 것을 알고 있습니다. 이런 상황에서는 미술전시회를 방문하는 것이 좋은 방법 중 하나일 수 있습니다. 서울시립 북서울미술관에서 2024 유휴공간 전시인 《멀리서 손바닥으로, 반짝》 전시회가 있습니다. 이 전시는 2024년 12월 17일부터 2025년 8월 17일까지 진행되며, 노원구에 위치한 북서울미술관에서 열립니다. 또한, 마포구립서강도서관에서는 4-5월 동안 어린이갤러리 전시가 열릴 예정이며, 이 역시 미술전시로 방문하실 수 있습니다. 이 두 전시 중 하나를 선택하여 방문하시면 새로운 환경과 예술 작품을 통해 마음을 치유하고 즐거운 시간을 보낼 수 있을 것입니다.",
};

export const postEventRecommendationChatbot = async (prompt) => {
  try {
    const serverResponse = await apiClient.post("/api/events", prompt);

    if (
      serverResponse &&
      serverResponse.data.success &&
      serverResponse.data.data &&
      serverResponse.data.data.length > 0
    ) {
      return serverResponse.data;
    } else {
      console.error("Error extracting data from response:", serverResponse);
      throw new Error(
        serverResponse?.result ||
          "챗봇으로부터 유효한 추천 데이터를 받지 못했습니다."
      );
    }
  } catch (error) {
    console.error(
      "postEventRecommendationChatbot failed:",
      error,
      "Prompt:",
      prompt
    );
    return []; // 또는 throw error;
  }
};
