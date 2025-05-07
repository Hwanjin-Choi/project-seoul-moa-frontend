import React from "react";
import styled from "styled-components"; // styled-components import
import { Color } from "../../styles/colorsheet";

// 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소들 위에 오도록 z-index 설정 */
`;

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

const Message = styled.p`
  font-size: 18px; /* 가독성 좋은 폰트 크기 */
  color: ${Color.BC1}; /* 가장 진한 기본 텍스트 색상 */
  margin: 0; /* 기본 마진 제거 */
  margin-bottom: 30px; /* 버튼과의 간격 */
  line-height: 1.6; /* 줄 간격 */
  font-weight: 500; /* 약간 굵게 */
  white-space: pre-wrap; /* 줄바꿈이 필요한 경우 적용 */
`;

const ConfirmButton = styled.button`
  padding: 8px 15px;
  /* margin-left: 10px; // 버튼이 하나이므로 margin-left 제거 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  color: white;
  font-size: 0.9rem; /* 버튼 폰트 크기 (선택 사항) */
  transition: background-color 0.2s ease; /* 부드러운 효과 (선택 사항) */
  background-color: ${Color.MC1}; /* 주 테마 색상 */
  color: white;

  &:hover {
    background-color: ${Color.MC2}; /* 호버 시 약간 밝은 테마 색상 */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(132, 120, 255, 0.3); /* 테마 색상 그림자 */
  }
`;

// 모달 컴포넌트
const PrivateRedirectionModal = ({ isOpen, onClose, message, onConfirm }) => {
  if (!isOpen) return null;
  return (
    // 스타일 컴포넌트 사용
    <ModalOverlay>
      <ModalContent>
        <Message>{message}</Message>
        <ConfirmButton onClick={onConfirm}>로그인</ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PrivateRedirectionModal;
