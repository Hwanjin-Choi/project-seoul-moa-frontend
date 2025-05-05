import styled, { keyframes, createGlobalStyle } from "styled-components";

// --- Global Styles ---
export const GlobalChatStyle = createGlobalStyle`
  .chat-message-list::-webkit-scrollbar {
    width: 6px;
  }
  .chat-message-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  .chat-message-list::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 3px;
  }
  .chat-message-list::-webkit-scrollbar-thumb:hover {
    background: #a5a5a5;
  }
`;

// --- Animations ---
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

// --- Styled Components ---

// Floating Action Button
export const FabButton = styled.button`
  position: fixed;
  bottom: 80px; /* 모바일에서 약간 위로 */
  right: 20px; /* 모바일에서 약간 안쪽으로 */
  width: 55px; /* 모바일에서 약간 작게 */
  height: 55px; /* 모바일에서 약간 작게 */
  border-radius: 50%;
  background: #8478ff;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.1);
  }

  /* 데스크탑 스타일 (기존 스타일 유지 또는 조정) */
  @media (min-width: 769px) {
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
  }
`;

// Modal Overlay
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center; /* 기본적으로 중앙 정렬 */
  z-index: 1050;
  padding: 1rem; /* 기본 패딩 */
  animation: ${fadeIn} 0.3s ease-out forwards;

  /* 모바일에서는 화면 하단에 붙도록 조정 (선택적) */
  @media (max-width: 768px) {
    align-items: flex-end; /* 화면 하단 정렬 */
    padding: 0; /* 하단 정렬 시 패딩 제거 */
  }
`;

// Modal Container
export const ModalContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 650px; /* 데스크탑 최대 너비 */
  height: 85vh; /* 데스크탑 높이 */
  max-height: 750px; /* 데스크탑 최대 높이 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${scaleIn} 0.3s ease-out forwards;

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    max-width: 100%; /* 모바일에서는 화면 너비 전체 사용 */
    height: 90vh; /* 모바일 높이 조정 */
    max-height: 90vh; /* 모바일 최대 높이 */
    border-radius: 12px 12px 0 0; /* 하단 정렬 시 상단 모서리만 둥글게 */
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.15); /* 위쪽 그림자 강조 */
    animation: none; /* 모바일에서는 다른 애니메이션 또는 없음 */
    /* 슬라이드 업 애니메이션 추가 (선택적) */
    /* transform: translateY(100%);
    animation: slideUp 0.4s ease-out forwards; */
  }

  /* @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  } */
`;

// Modal Header
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem; /* 데스크탑 패딩 */
  border-bottom: 1px solid #e5e7eb;
  background: #8478ff;
  color: white;
  flex-shrink: 0; /* 헤더 크기 고정 */

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    padding: 0.75rem 1rem; /* 모바일 패딩 축소 */
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.1rem; /* 데스크탑 폰트 크기 */
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    font-size: 1rem; /* 모바일 폰트 크기 축소 */
    gap: 0.4rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    padding: 0.2rem;
    svg {
      font-size: 1.1rem; /* 모바일 닫기 버튼 아이콘 크기 조정 */
    }
  }
`;

// Message List Area
export const MessageListArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.5rem; /* 데스크탑 패딩 */
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    padding: 1rem; /* 모바일 패딩 축소 */
  }
`;

// Message Bubble Wrapper
export const BubbleWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem; /* 데스크탑 간격 */
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    margin-bottom: 0.75rem; /* 모바일 간격 축소 */
  }
`;

// Message Content Container (Icon + Bubble)
export const MessageContentContainer = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 80%; /* 데스크탑 버블 최대 너비 */
  flex-direction: ${(props) => (props.$isUser ? "row-reverse" : "row")};

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    max-width: 85%; /* 모바일 버블 최대 너비 약간 증가 */
  }
`;

// Avatar Icon
export const AvatarIcon = styled.div`
  flex-shrink: 0;
  width: 36px; /* 데스크탑 아이콘 크기 */
  height: 36px; /* 데스크탑 아이콘 크기 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${(props) => (props.$isUser ? "#3b82f6" : "#8b5cf6")};
  margin: ${(props) => (props.$isUser ? "0 0 0 0.5rem" : "0 0.5rem 0 0")};

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    width: 32px; /* 모바일 아이콘 크기 축소 */
    height: 32px; /* 모바일 아이콘 크기 축소 */
    margin: ${(props) => (props.$isUser ? "0 0 0 0.4rem" : "0 0.4rem 0 0")};
  }
`;

export const ChatbotIcon = styled.div`
  flex-shrink: 0;
  width: 36px; /* 데스크탑 아이콘 크기 */
  height: 36px; /* 데스크탑 아이콘 크기 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) => (props.$isUser ? "0 0 0 0.5rem" : "0 0.5rem 0 0")};

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    width: 32px; /* 모바일 아이콘 크기 축소 */
    height: 32px; /* 모바일 아이콘 크기 축소 */
    margin: ${(props) => (props.$isUser ? "0 0 0 0.4rem" : "0 0.4rem 0 0")};
  }
`;

// Message Bubble Styling
export const Bubble = styled.div`
  background-color: ${(props) => (props.$isUser ? "#dbeafe" : "#ede9fe")};
  color: #1f2937;
  padding: 0.75rem 1rem; /* 데스크탑 패딩 */
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-bottom-left-radius: ${(props) => (props.$isUser ? "12px" : "4px")};
  border-bottom-right-radius: ${(props) => (props.$isUser ? "4px" : "12px")};
  word-wrap: break-word;
  font-size: 0.9rem; /* 데스크탑 폰트 크기 */

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem; /* 모바일 패딩 축소 */
    font-size: 0.85rem; /* 모바일 폰트 크기 약간 축소 */
  }
`;

// Event Card Styling
export const StyledEventCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem; /* 데스크탑 패딩 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.75rem;
  width: 100%;
  max-width: 350px; /* 데스크탑 최대 너비 */

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    padding: 0.75rem; /* 모바일 패딩 축소 */
    max-width: 100%; /* 모바일에서는 버블 너비에 맞춤 */
  }
`;

export const EventTitle = styled.h3`
  font-weight: 600;
  font-size: 0.9rem; /* 데스크탑 폰트 크기 */
  color: #111827;
  margin-bottom: 0.25rem;

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    font-size: 0.85rem; /* 모바일 폰트 크기 약간 축소 */
  }
`;

export const EventInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem; /* 데스크탑 폰트 크기 */
  color: #6b7280;
  margin-bottom: 0.25rem;

  svg {
    margin-right: 0.25rem;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
  }

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    font-size: 0.7rem; /* 모바일 폰트 크기 약간 축소 */
    svg {
      width: 11px;
      height: 11px;
    }
  }
`;

// Chat Input Area
export const InputArea = styled.div`
  border-top: 1px solid #e5e7eb;
  padding: 1rem 1.5rem; /* 데스크탑 패딩 */
  background-color: #ffffff;
  flex-shrink: 0; /* 입력 영역 크기 고정 */

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    padding: 0.75rem 1rem; /* 모바일 패딩 축소 */
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 9999px;
  padding: 0.25rem 0.5rem 0.25rem 1rem; /* 데스크탑 패딩 */

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    padding: 0.2rem 0.4rem 0.2rem 0.8rem; /* 모바일 패딩 축소 */
  }
`;

export const TextInput = styled.textarea`
  flex-grow: 1;
  background-color: transparent;
  border: none;
  resize: none;
  padding: 0.5rem 0.25rem; /* 데스크탑 패딩 */
  font-size: 0.9rem; /* 데스크탑 폰트 크기 */
  color: #374151;
  outline: none;
  max-height: 100px;
  overflow-y: auto;
  line-height: 1.4; /* 줄 간격 추가 */

  &::placeholder {
    color: #9ca3af;
  }

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    padding: 0.4rem 0.2rem; /* 모바일 패딩 축소 */
    font-size: 0.85rem; /* 모바일 폰트 크기 약간 축소 */
    max-height: 80px; /* 모바일 최대 높이 약간 축소 */
  }
`;

export const SendButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#6366f1")};
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px; /* 데스크탑 버튼 크기 */
  height: 36px; /* 데스크탑 버튼 크기 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;
  flex-shrink: 0; /* 버튼 크기 고정 */

  &:hover:not(:disabled) {
    background-color: #4f46e5;
  }

  /* 모바일 스타일 */
  @media (max-width: 768px) {
    width: 32px; /* 모바일 버튼 크기 축소 */
    height: 32px; /* 모바일 버튼 크기 축소 */
    margin-left: 0.4rem;
  }
`;

// Loading Indicator (Using Font Awesome Spinner)
export const LoadingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  color: #a5b4fc; /* Spinner color */
`;
