import React, { useState, useEffect } from 'react';
import ChatBox from '../ChatBox/ChatBox';

const ChatIcon = ({ predefinedMessages, apiKey }) => {
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const [showPredefined, setShowPredefined] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleChatBox = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsChatBoxVisible(!isChatBoxVisible);
      setTimeout(() => setIsAnimating(false), 300); // Reduced from 700ms to 300ms
    }
  };

  const hidePredefinedMessages = () => {
    setShowPredefined(false);
  };

  return (
    <>
      <div
        className={`chat-icon ${isChatBoxVisible ? 'chat-icon-hidden' : ''} ${isMobile ? 'mobile-chat-icon' : ''} ${isAnimating ? 'chat-icon-animate' : ''}`}
        onClick={toggleChatBox}
      />
      {isChatBoxVisible && (
        <ChatBox
          isVisible={isChatBoxVisible}
          onClose={toggleChatBox}
          predefinedMessages={predefinedMessages}
          showPredefinedOptions={showPredefined}
          onHidePredefined={hidePredefinedMessages}
          messages={messages}
          setMessages={setMessages}
          apiKey={apiKey}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default ChatIcon;