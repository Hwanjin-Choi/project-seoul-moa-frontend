import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import BackHeader from "../BackHeader/BackHeader"; // BackHeader만 import
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import ChatModal from "../Chatbot/ChatModal"; // Import ChatModal
import { GlobalChatStyle, FabButton } from "../Chatbot/styles"; // Import styles

const LayoutWrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
  }
  width: 100%;
  height: 100vh;
  position: relative;
  background: linear-gradient(to bottom, #fff, ${Color.MC4});

  box-sizing: border-box;
  overflow: hidden; /* LayoutWrapper 자체의 스크롤은 막음 */
`;

const Content = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;

  padding: 0 0 60px 0;

  @media (max-width: 768px) {
    padding: 0 0 60px 0;
  }
`;

const NavigationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const MobileLayout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? true : false
  );
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <LayoutWrapper>
      <GlobalChatStyle />
      <BackHeader />
      {isLoggedIn && (
        <FabButton onClick={toggleChat} aria-label="챗봇 열기">
          <FontAwesomeIcon icon={faCommentDots} size="lg" />
        </FabButton>
      )}
      {/* Chat Modal */}
      <Content>{children}</Content>
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      {isLoggedIn && <ChatModal isOpen={isChatOpen} onClose={toggleChat} />}
    </LayoutWrapper>
  );
};

export default MobileLayout;
