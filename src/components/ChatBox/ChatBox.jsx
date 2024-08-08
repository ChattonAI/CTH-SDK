import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatHeader from '../ChatHeader/ChatHeader.jsx';
import MessageList from '../MessageList/MessageList.jsx';
import InputBox from '../InputBox/InputBox.jsx';
import PredefinedOptions from '../PredefinedOptions/PredefinedOptions.jsx';
import config from '../../config/cth-sdk-config.js';

const ChatBox = ({ isVisible, onClose, setMessages, messages, isMobile, businessId, predefinedMessages = [] }) => {
  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showPing, setShowPing] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const messageListContainer = useRef(null);

  const AUTH_ENDPOINT = "https://chat.chattonai.com/api/chatbot/auth";
  const GENERATE_ENDPOINT = "https://chat.chattonai.com/api/chatbot/generate/response";

  useEffect(() => {
    // Retrieve stored data on component mount
    const storedToken = sessionStorage.getItem('authToken');
    const storedSessionId = sessionStorage.getItem('sessionId');
    const storedBusinessId = sessionStorage.getItem('businessId');
    const storedSuggestions = JSON.parse(sessionStorage.getItem('suggestions'));
    const storedMessages = JSON.parse(sessionStorage.getItem('messages'));

    if (storedToken && storedBusinessId === businessId) {
      setAuthToken(storedToken);
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
  }, [businessId, predefinedMessages, setMessages]);

  useEffect(() => {
    // Save suggestions and messages to sessionStorage whenever they change
    sessionStorage.setItem('suggestions', JSON.stringify(suggestions));
    sessionStorage.setItem('messages', JSON.stringify(messages));
  }, [suggestions, messages]);

  const getAuthToken = async () => {
    try {
      const response = await axios.get(AUTH_ENDPOINT, {
        headers: {
          'x-business-id': businessId,
        },
      });
      const newToken = response.data.token;
      setAuthToken(newToken);
      sessionStorage.setItem('authToken', newToken);
      sessionStorage.setItem('businessId', businessId);
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
  };

  const appendMessage = (messageText, isUser) => {
    setMessages(prevMessages => [...prevMessages, { text: messageText, isUser }]);
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
        if (!authToken) {
          await getAuthToken();
        }

        const response = await axios.post(GENERATE_ENDPOINT, payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'x-business-id': businessId,
            'x-session-id': currentSessionId,
          },
        });

        const responseData = JSON.parse(response.data.body);
        appendMessage(responseData.response, false);
        
        if (response.data.session_id) {
          setCurrentSessionId(response.data.session_id);
          sessionStorage.setItem('sessionId', response.data.session_id);
        }

        if (responseData.suggestions && responseData.suggestions.length > 0) {
          setSuggestions(responseData.suggestions);
        } else {
          setSuggestions([]);
        }

      } catch (error) {
        console.error('Error sending message:', error);
        if (error.response && error.response.status === 401) {
          // Token is invalid, get a new one and retry
          await getAuthToken();
          await sendMessage(content, isUser);
        } else {
          appendMessage("Sorry, I couldn't process your message. Please try again later.", false);
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