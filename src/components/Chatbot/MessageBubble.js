import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot, faSpinner } from "@fortawesome/free-solid-svg-icons";
import EventCard from "./EventCard"; // Import EventCard
import {
  BubbleWrapper,
  MessageContentContainer,
  AvatarIcon,
  Bubble,
  ChatbotIcon,
  LoadingSpinnerWrapper, // Import LoadingSpinnerWrapper
} from "./styles"; // Import styles
import logo from "../../assets/seoulmoa.svg";
import styled from "styled-components";
const Logo = styled.img`
  width: 45px;
  height: 45px;
  cursor: pointer;
  /* 로고와 닉네임/버튼 간 간격을 위해 왼쪽 마진 제거 또는 조정 가능 */
  /* margin-left: 10px; */
`;

// Message Bubble Component
export const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";
  const isBotResponse = message.sender === "bot" && message.type === "response";

  return (
    <BubbleWrapper $isUser={isUser}>
      <MessageContentContainer $isUser={isUser}>
        {isUser ? (
          <AvatarIcon $isUser={isUser}>
            <FontAwesomeIcon icon={faUser} size="sm" />
          </AvatarIcon>
        ) : (
          <ChatbotIcon $isUser={false}>
            <Logo src={logo} alt="logo" />
          </ChatbotIcon>
        )}

        <Bubble $isUser={isUser}>
          {isBotResponse ? (
            // Render bot response with text and event cards
            <div>
              {message.data.result && (
                <p
                  style={{
                    marginBottom: message.data.data?.length > 0 ? "1rem" : "0",
                  }}
                >
                  {message.data.result}
                </p>
              )}
              {message.data.data && message.data.data.length > 0 && (
                <div>
                  {message.data.data.map((event, index) => (
                    <EventCard key={event.event_id || index} event={event} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Render simple text message (user or simple bot text)
            <p>{message.data}</p>
          )}
        </Bubble>
      </MessageContentContainer>
    </BubbleWrapper>
  );
};

// Loading Indicator Component
export const LoadingIndicator = () => (
  <BubbleWrapper $isUser={false}>
    <MessageContentContainer $isUser={false}>
      <AvatarIcon $isUser={false}>
        <FontAwesomeIcon icon={faRobot} size="sm" />
      </AvatarIcon>
      <Bubble $isUser={false}>
        <LoadingSpinnerWrapper>
          <FontAwesomeIcon icon={faSpinner} spin size="lg" />{" "}
          {/* Use spinning spinner */}
        </LoadingSpinnerWrapper>
      </Bubble>
    </MessageContentContainer>
  </BubbleWrapper>
);
