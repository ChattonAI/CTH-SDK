import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatHeader from '../ChatHeader/ChatHeader.jsx';
import MessageList from '../MessageList/MessageList.jsx';
import InputBox from '../InputBox/InputBox.jsx';
import PredefinedOptions from '../PredefinedOptions/PredefinedOptions.jsx';
import config from '../../config/cth-sdk-config.js';

const ChatBox = ({ predefinedMessages = [], isVisible, onClose, showPredefinedOptions, onHidePredefined, setMessages, messages, isMobile, businessId }) => {
  const [isSending, setIsSending] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showPing, setShowPing] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const messageListContainer = useRef(null);

  const AUTH_ENDPOINT = "https://chat.chattonai.com/api/chatbot/auth";
  const GENERATE_ENDPOINT = "https://chat.chattonai.com/api/chatbot/generate/response";

  useEffect(() => {
    // Retrieve stored token and business ID on component mount
    const storedToken = localStorage.getItem('authToken');
    const storedBusinessId = localStorage.getItem('businessId');

    if (storedToken && storedBusinessId === businessId) {
      setAuthToken(storedToken);
    } else {
      getAuthToken();
    }
  }, [businessId]);

  const getAuthToken = async () => {
    try {
      const response = await axios.get(AUTH_ENDPOINT, {
        headers: {
          'x-business-id': businessId,
        },
      });
      const newToken = response.data.token;
      setAuthToken(newToken);
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('businessId', businessId);
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
  };

  const appendMessage = (messageText, isUser) => {
    setMessages(prevMessages => [...prevMessages, { text: messageText, isUser }]);
  };

  const sendMessage = async (content, isUser = true) => {
    if (!content.trim()) return;

    setIsChatbotTyping(true);
    appendMessage(content, isUser);

    if (isUser && showPredefinedOptions) {
      onHidePredefined();
    }

    if (isUser) {
      setIsSending(true);

      const payload = {
        message: content,
        session_id: currentSessionId,
      };

      try {
        if (!authToken) {
          await getAuthToken();
        }

        const response = await axios.post(GENERATE_ENDPOINT, payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'x-business-id': businessId,
          },
        });

        appendMessage(response.data.body, false);
        if (response.data.session_id) {
          setCurrentSessionId(response.data.session_id);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        if (error.response && error.response.status === 401) {
          // Token is invalid, get a new one and retry
          await getAuthToken();
          await sendMessage(content, isUser);
        } else {
          appendMessage("Sorry, I couldn't process your request. Please try again later.", false);
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
    ${isMobile ? 'mobile-chat-box' : 'desktop-chat-box'}
    ${backgroundColor} 
    ${backgroundOpacity} 
    ${isMobile ? 'rounded-lg' : borderRadius} 
    ${isClosing ? 'chat-box-slide-out' : isVisible ? 'chat-box-slide-in' : ''}
    ${isMobile && isInputFocused ? 'mobile-chat-box-zoomed' : ''}
    z-[9999]
  `;

  const wrapperClasses = `
    chat-box-wrapper 
    ${isMobile ? 'mobile-wrapper' : 'desktop-wrapper'}
    ${isVisible ? 'wrapper-visible' : ''}
    ${!isMobile ? 'desktop-no-blur' : ''}
  `;

  return (
    <div className={wrapperClasses}>
      <div className={chatBoxClasses}>
        <ChatHeader onClose={handleClose} />
        <div className="message-list-container flex-grow scrollbar" ref={messageListContainer}>
          <MessageList messages={messages} isTyping={isChatbotTyping} />
        </div>
        {showPredefinedOptions && predefinedMessages.length > 0 && (
          <PredefinedOptions 
            onSendMessage={sendMessage} 
            predefinedMessages={predefinedMessages} 
            isVisible={showPredefinedOptions}
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