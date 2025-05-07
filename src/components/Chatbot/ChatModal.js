import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faTimes } from "@fortawesome/free-solid-svg-icons";
import ChatInterface from "./ChatInterface"; // Import ChatInterface
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
} from "./styles"; // Import styles

const ChatModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            <FontAwesomeIcon icon={faCommentDots} />
            서울 모아 도우미
          </ModalTitle>
          <CloseButton onClick={onClose} aria-label="챗봇 닫기">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </CloseButton>
        </ModalHeader>
        <ChatInterface />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatModal;
