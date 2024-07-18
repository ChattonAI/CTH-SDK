import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader.jsx';
import MessageList from '../MessageList/MessageList.jsx';
import InputBox from '../InputBox/InputBox.jsx';
import PredefinedOptions from '../PredefinedOptions/PredefinedOptions.jsx';
import config from '../../config/cth-sdk-config.js';

const ChatBox = ({ predefinedMessages = [], isVisible, onClose, showPredefinedOptions, onHidePredefined, setMessages, messages, apiKey, isMobile }) => {
  const [isSending, setIsSending] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messageListContainer = useRef(null);

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

      const apiEndpoint = 'https://ipcv9qzgyh.execute-api.us-east-1.amazonaws.com/Test';
      const payload = {
        message: content,
        apiKey: apiKey,
        session_id: currentSessionId,
      };

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          appendMessage(data.body, false);
          if (data.session_id) {
            setCurrentSessionId(data.session_id);
          }
        } else {
          console.error('API request failed:', response);
        }
      } catch (error) {
        console.error('Error sending message:', error);
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