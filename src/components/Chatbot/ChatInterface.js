import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { MessageBubble, LoadingIndicator } from "./MessageBubble"; // Import MessageBubble and LoadingIndicator

import { dummyApiResponse } from "../../api/ai/api";
import {
  MessageListArea,
  InputArea,
  InputWrapper,
  TextInput,
  SendButton,
} from "./styles"; // Import styles

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      type: "text",
      data: "안녕하세요, 서울 모아에요, 궁금한 점을 말씀해주시면 관련된 문화행사를 찾아보겠습니다.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Adjust textarea height
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle message sending
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      type: "text",
      data: trimmedInput,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay

    const botResponse = {
      id: Date.now() + 1,
      sender: "bot",
      type: "response",
      data: dummyApiResponse,
    };
    setMessages((prev) => [...prev, botResponse]);
    setIsLoading(false);

    setTimeout(() => inputRef.current?.focus(), 0); // Refocus input
  }, [inputValue, isLoading]);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <MessageListArea className="chat-message-list">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </MessageListArea>
      <InputArea>
        <InputWrapper>
          <TextInput
            ref={inputRef}
            rows="1"
            placeholder="메시지를 입력하세요..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            aria-label="메시지 전송"
          >
            <FontAwesomeIcon icon={faPaperPlane} size="lg" />{" "}
            {/* Use FA icon */}
          </SendButton>
        </InputWrapper>
      </InputArea>
    </>
  );
};

export default ChatInterface;
