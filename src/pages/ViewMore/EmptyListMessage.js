// EmptyListMessage.js
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 상황에 맞는 아이콘을 선택합니다. 예: faInbox, faFolderOpen, faListAlt, faCalendarTimes 등
// 색상 테마 파일 경로는 실제 프로젝트 구조에 맞게 조정해주십시오.
import {
  faInbox,
  faChevronLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Color } from "../../styles/colorsheet";

// 전체 컨테이너 스타일
const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* 아이콘과 텍스트를 수직으로 배치 */
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  padding: 60px 30px; /* 충분한 내부 여백 */
  text-align: center; /* 텍스트 중앙 정렬 */
  min-height: 250px; /* 최소 높이를 지정하여 공간 차지 */
  width: 100%; /* 부모 요소 너비에 맞춤 */
  background-color: ${Color.BC5}; /* 가장 밝은 배경색 */
  border-radius: 12px; /* 부드러운 모서리 */
  border: 1px dashed ${Color.BC4}; /* 눈에 띄지만 강하지 않은 점선 테두리 */
  margin-top: 20px; /* 목록 위 요소와의 간격 (선택 사항) */
  box-sizing: border-box; /* 패딩과 테두리가 너비/높이에 포함되도록 */
`;

// 아이콘 스타일
const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 52px; /* 아이콘 크기 */
  color: ${Color.BC3}; /* 너무 강하지 않은 회색 아이콘 */
  margin-bottom: 25px; /* 아이콘과 텍스트 사이 간격 */
`;

// 메시지 텍스트 스타일
const MessageText = styled.p`
  font-size: 17px; /* 메시지 폰트 크기 */
  color: ${Color.BC2}; /* 약간 어두운 회색으로 가독성 확보 */
  line-height: 1.6; /* 줄 간격 */
  margin: 0; /* 기본 마진 제거 */
  font-weight: 500; /* 너무 가늘지 않은 굵기 */
`;

/**
 * 리스트가 비어 있을 때 표시할 메시지 컴포넌트
 * @param {string} message - 표시할 메시지 텍스트
 * @param {object} icon - FontAwesome 아이콘 객체 (예: faFolderOpen)
 */
const EmptyListMessage = ({
  message = "표시할 내용이 없습니다.", // 기본 메시지
  icon = faInbox, // 기본 아이콘 (빈 폴더)
}) => {
  return (
    <Wrapper>
      <StyledIcon icon={icon} />
      <MessageText>{message}</MessageText>
    </Wrapper>
  );
};

export default EmptyListMessage;
