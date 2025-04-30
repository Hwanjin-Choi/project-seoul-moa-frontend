import {
  faGuitar,
  faBookOpen,
  faMasksTheater,
  faMusic,
  faFilm,
  faMicrophoneLines,
  faTheaterMasks,
  faCalendarCheck,
  faPaintBrush,
  faPalette,
  faUsers,
  faQuestion, // 사용할 아이콘들을 @fortawesome/free-solid-svg-icons 등에서 가져옵니다.
} from "@fortawesome/free-solid-svg-icons";

// 카테고리 ID를 키로, Font Awesome 아이콘 객체를 값으로 하는 맵
const categoryIconMap = {
  1: faQuestion, // 기타
  2: faBookOpen, // 교육/체험
  3: faMusic, // 클래식
  4: faMicrophoneLines, // 콘서트
  5: faFilm, // 영화
  6: faTheaterMasks, // 독주/독창회 (아이콘은 예시입니다)
  7: faMasksTheater, // 연극
  8: faCalendarCheck, // 축제
  9: faMasksTheater, // 뮤지컬/오페라 (연극과 동일 아이콘 사용 예시)
  10: faGuitar, // 국악 (아이콘은 예시입니다)
  11: faPaintBrush, // 전시/미술
  12: faUsers, // 무용 (아이콘은 예시입니다)
  // 기본 아이콘 (매핑되지 않은 ID가 있을 경우 대비)
  default: faQuestion,
};

// 카테고리 ID를 받아 해당하는 아이콘을 반환하는 함수
export const getIconForCategory = (categoryId) => {
  console.log(categoryId);
  return categoryIconMap[categoryId] || categoryIconMap.default;
};
