import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ChatHeader from "../ChatHeader/ChatHeader.jsx";
import MessageList from "../MessageList/MessageList.jsx";
import InputBox from "../InputBox/InputBox.jsx";
import PredefinedOptions from "../PredefinedOptions/PredefinedOptions.jsx";
import config from "../../config/cth-sdk-config.js";

const ChatBox = ({
  isVisible,
  onClose,
  setMessages,
  messages,
  isMobile,
  businessId,
  predefinedMessages = [],
}) => {
  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showPing, setShowPing] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const messageListContainer = useRef(null);
  const refreshTokenTimeoutRef = useRef(null);

  const AUTH_ENDPOINT = "https://chat.chattonai.com/api/chatbot/auth";
  const GENERATE_ENDPOINT =
    "https://chat.chattonai.com/api/chatbot/generate/response";

  const axiosInstance = axios.create({
    timeout: 20000, // Set a timeout of 10 seconds
  });

  const getAuthToken = useCallback(async () => {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINT, {
        headers: {
          "x-business-id": businessId,
        },
      });
      const newToken = response.data.token;
      const expiresIn = response.data.expiresIn || 3600; // Default to 1 hour if not provided
      const newExpirationTime = Date.now() + expiresIn * 1000;

      setAuthToken(newToken);
      setTokenExpirationTime(newExpirationTime);
      sessionStorage.setItem("authToken", newToken);
      sessionStorage.setItem(
        "tokenExpirationTime",
        newExpirationTime.toString(),
      );
      sessionStorage.setItem("businessId", businessId);

      // Schedule the next token refresh
      scheduleTokenRefresh(expiresIn);

      return newToken;
    } catch (error) {
      console.error("Error getting auth token:", error);
      throw error;
    }
  }, [businessId]);

  const scheduleTokenRefresh = useCallback(
    (expiresIn) => {
      // Clear any existing timeout
      if (refreshTokenTimeoutRef.current) {
        clearTimeout(refreshTokenTimeoutRef.current);
      }

      // Schedule a new timeout to refresh the token
      const refreshTime = (expiresIn - 300) * 1000; // 5 minutes before expiration
      refreshTokenTimeoutRef.current = setTimeout(() => {
        getAuthToken();
      }, refreshTime);
    },
    [getAuthToken],
  );

  useEffect(() => {
    // Retrieve stored data on component mount
    const storedToken = sessionStorage.getItem("authToken");
    const storedExpirationTime = sessionStorage.getItem("tokenExpirationTime");
    const storedSessionId = sessionStorage.getItem("sessionId");
    const storedBusinessId = sessionStorage.getItem("businessId");
    const storedSuggestions = JSON.parse(sessionStorage.getItem("suggestions"));
    const storedMessages = JSON.parse(sessionStorage.getItem("messages"));

    if (
      storedToken &&
      storedExpirationTime &&
      storedBusinessId === businessId
    ) {
      const expirationTime = parseInt(storedExpirationTime, 10);
      if (expirationTime > Date.now()) {
        setAuthToken(storedToken);
        setTokenExpirationTime(expirationTime);
        const timeUntilExpiration = expirationTime - Date.now();
        scheduleTokenRefresh(timeUntilExpiration / 1000);
      } else {
        getAuthToken();
      }
    } else {
      getAuthToken();
    }

    if (storedSessionId) {
      setCurrentSessionId(storedSessionId);
    }

    if (storedSuggestions && storedSuggestions.length > 0) {
      setSuggestions(storedSuggestions);
    } else {
      setSuggestions(predefinedMessages);
    }

    if (storedMessages && storedMessages.length > 0) {
      setMessages(storedMessages);
    }

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (refreshTokenTimeoutRef.current) {
        clearTimeout(refreshTokenTimeoutRef.current);
      }
    };
  }, [
    businessId,
    predefinedMessages,
    setMessages,
    getAuthToken,
    scheduleTokenRefresh,
  ]);

  useEffect(() => {
    // Save suggestions and messages to sessionStorage whenever they change
    sessionStorage.setItem("suggestions", JSON.stringify(suggestions));
    sessionStorage.setItem("messages", JSON.stringify(messages));
  }, [suggestions, messages]);

  const appendMessage = (messageText, isUser) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageText, isUser },
    ]);
    setSuggestions([]);
  };

  const sendMessage = async (content, isUser = true) => {
    if (!content.trim()) return;

    setIsChatbotTyping(true);
    appendMessage(content, isUser);

    if (isUser) {
      setIsSending(true);

      const payload = {
        message: content,
        session_id: currentSessionId,
      };

      try {
        const response = await axiosInstance.post(GENERATE_ENDPOINT, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "x-business-id": businessId,
            "x-session-id": currentSessionId,
          },
          timeout: 20000, // Increased timeout to 20 seconds
        });

        console.log("Raw Response Body:", response.data.body);

        let responseData;

        // Check if `body` contains another JSON string (nested case)
        if (typeof response.data.body === "string") {
          const parsedBody = JSON.parse(response.data.body);

          // If `parsedBody.body` exists and is another JSON string, parse it again
          if (parsedBody.body && typeof parsedBody.body === "string") {
            responseData = JSON.parse(parsedBody.body);
          } else {
            responseData = parsedBody;
          }
        } else {
          responseData = response.data.body;
        }

        // Now you can safely access responseData and append messages as needed
        if (responseData && responseData.response) {
          appendMessage(responseData.response, false);
        } else {
          console.error("Unexpected response structure:", responseData);
          appendMessage(
            "Sorry, I couldn't process your message. Please try again later.",
            false,
          );
        }

        if (responseData.session_id) {
          setCurrentSessionId(responseData.session_id);
          sessionStorage.setItem("sessionId", responseData.session_id);
        }

        if (responseData.suggestions && responseData.suggestions.length > 0) {
          setSuggestions(responseData.suggestions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error details:", error);

        if (error.response && error.response.status === 401) {
          try {
            await getAuthToken();
            await sendMessage(content, isUser); // Retry after token refresh
          } catch (retryError) {
            console.error("Error retrying after token refresh:", retryError);
            appendMessage(
              "Sorry, I couldn't process your message. Please try again later.",
              false,
            );
          }
        } else if (
          error.code === "ECONNABORTED" ||
          error.message.includes("Network Error")
        ) {
          appendMessage(
            "Sorry, there seems to be a network issue. Please check your connection and try again.",
            false,
          );
        } else {
          appendMessage(
            "Sorry, I couldn't process your message. Please try again later.",
            false,
          );
        }
      } finally {
        setIsSending(false);
        setIsChatbotTyping(false);
      }
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleInputFocus = (focused) => {
    setIsInputFocused(focused);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPing(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { backgroundColor, backgroundOpacity, borderRadius } = config.chatBox;

  const chatBoxClasses = `
    chat-box 
    ${isMobile ? "mobile-chat-box" : "desktop-chat-box"}
    ${backgroundColor} 
    ${backgroundOpacity} 
    ${isMobile ? "rounded-lg" : borderRadius} 
    ${isClosing ? "chat-box-slide-out" : isVisible ? "chat-box-slide-in" : ""}
    ${isMobile && isInputFocused ? "mobile-chat-box-zoomed" : ""}
    z-[9999]
  `;

  const wrapperClasses = `
    chat-box-wrapper 
    ${isMobile ? "mobile-wrapper" : "desktop-wrapper"}
    ${isVisible ? "wrapper-visible" : ""}
    ${!isMobile ? "desktop-no-blur" : ""}
  `;

  return (
    <div className={wrapperClasses}>
      <div className={chatBoxClasses}>
        <ChatHeader onClose={handleClose} />
        <div
          className="message-list-container flex-grow scrollbar"
          ref={messageListContainer}
        >
          <MessageList messages={messages} isTyping={isChatbotTyping} />
        </div>
        {suggestions.length > 0 && (
          <PredefinedOptions
            onSendMessage={sendMessage}
            predefinedMessages={suggestions}
            isVisible={true}
          />
        )}
        <InputBox
          onSendMessage={sendMessage}
          isSending={isSending}
          onFocus={() => handleInputFocus(true)}
          onBlur={() => handleInputFocus(false)}
        />
      </div>
    </div>
  );
};

export default ChatBox;
