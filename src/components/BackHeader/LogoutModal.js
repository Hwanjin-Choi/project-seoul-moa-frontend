// ConfirmModal.js
import React from "react";
import styled from "styled-components";
// 색상 테마 파일 경로는 실제 프로젝트 구조에 맞게 조정해주십시오.
import { Color } from "../../styles/colorsheet";

// 반투명 배경 오버레이
const ModalOverlay = styled.div`
  position: fixed; /* 화면 전체를 덮도록 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* 반투명 검은색 배경 */
  display: flex; /* 내부 컨텐츠를 중앙 정렬하기 위함 */
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소들 위에 표시 */
`;

// 모달 창 컨텐츠 영역
const ModalContent = styled.div`
  background-color: #ffffff; /* 흰색 배경 */
  padding: 35px 40px; /* 넉넉한 내부 여백 */
  border-radius: 15px; /* 부드러운 모서리 */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); /* 입체감을 위한 그림자 */
  z-index: 1001; /* 오버레이 위에 표시 */
  width: 90%; /* 모바일 반응형 너비 */
  max-width: 380px; /* 최대 너비 제한 */
  text-align: center; /* 내부 텍스트 중앙 정렬 */
  border-top: 6px solid ${Color.MC1}; /* 상단에 테마 색상 강조선 */
`;

// 확인 메시지 텍스트
const ModalMessage = styled.p`
  font-size: 18px; /* 가독성 좋은 폰트 크기 */
  color: ${Color.BC1}; /* 가장 진한 기본 텍스트 색상 */
  margin: 0; /* 기본 마진 제거 */
  margin-bottom: 30px; /* 버튼과의 간격 */
  line-height: 1.6; /* 줄 간격 */
  font-weight: 500; /* 약간 굵게 */
  white-space: pre-wrap; /* 줄바꿈이 필요한 경우 적용 */
`;

// 버튼들을 감싸는 영역
const ModalActions = styled.div`
  display: flex;
  justify-content: center; /* 버튼 중앙 정렬 */
  gap: 15px; /* 버튼 사이의 간격 */
`;

// 기본 버튼 스타일 (Confirm, Cancel 버튼이 상속)
const ModalButton = styled.button`
  cursor: pointer;
  padding: 12px 30px; /* 버튼 크기 */
  border: none;
  border-radius: 8px; /* 버튼 모서리 둥글게 */
  font-size: 15px;
  font-weight: 600; /* 버튼 텍스트 굵게 */
  transition: all 0.2s ease-in-out;
  min-width: 110px; /* 버튼 최소 너비 보장 */

  &:hover {
    transform: translateY(-2px); /* 위로 살짝 이동하는 호버 효과 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 호버 시 그림자 */
  }

  &:active {
    transform: translateY(0px); /* 클릭 시 원래 위치로 */
    box-shadow: none; /* 클릭 시 그림자 제거 */
  }
`;

// 확인 버튼 (테마 색상 사용)
const ConfirmButton = styled(ModalButton)`
  background-color: ${Color.MC1}; /* 주 테마 색상 */
  color: white;

  &:hover {
    background-color: ${Color.MC2}; /* 호버 시 약간 밝은 테마 색상 */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(132, 120, 255, 0.3); /* 테마 색상 그림자 */
  }
`;

// 취소 버튼 (덜 강조되는 스타일)
const CancelButton = styled(ModalButton)`
  background-color: ${Color.BC5}; /* 가장 밝은 회색 배경 */
  color: ${Color.BC2}; /* 어두운 회색 텍스트 */
  border: 1px solid ${Color.BC4}; /* 옅은 회색 테두리 */

  &:hover {
    background-color: ${Color.BC4}; /* 호버 시 약간 더 진한 회색 배경 */
    border-color: ${Color.BC3};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

/**
 * 로그아웃 등 작업 확인을 위한 모달 컴포넌트
 * @param {boolean} isOpen 모달 표시 여부
 * @param {function} onClose 모달 닫기 요청 함수 (오버레이 클릭, 취소 버튼 클릭 시 호출)
 * @param {function} onConfirm 확인 버튼 클릭 시 호출될 함수
 * @param {string} message 모달에 표시될 메시지 (기본값: "정말로 로그아웃 하시겠습니까?")
 */
const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  message = "정말로 로그아웃 하시겠습니까?", // 기본 메시지 설정
}) => {
  // isOpen이 false이면 아무것도 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  // 모달 컨텐츠 영역 내부 클릭 시 이벤트 전파 방지 (오버레이 클릭으로 닫히는 것 방지)
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // 오버레이 클릭 시 onClose 함수 호출
    <ModalOverlay onClick={onClose}>
      {/* 모달 컨텐츠 클릭 시 이벤트 전파 중단 */}
      <ModalContent onClick={handleContentClick}>
        <ModalMessage>{message}</ModalMessage>
        <ModalActions>
          {/* 취소 버튼 클릭 시 onClose 함수 호출 */}
          <CancelButton onClick={onClose}>아니오</CancelButton>
          {/* 확인 버튼 클릭 시 onConfirm 함수 호출 */}
          <ConfirmButton onClick={onConfirm}>예</ConfirmButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LogoutModal;
