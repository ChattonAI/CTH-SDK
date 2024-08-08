import React, { useState, useEffect } from 'react';
import ChatBox from '../ChatBox/ChatBox';

const ChatIcon = ({ predefinedMessages, businessId }) => {
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const [messages, setMessages] = useState(() => {
    const storedMessages = JSON.parse(sessionStorage.getItem('messages'));
    return storedMessages || [];
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPing, setShowPing] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Add ping notification after 3-5 seconds
    const pingTimer = setTimeout(() => {
      setShowPing(true);
    }, 3000 + Math.random() * 2000); // Random delay between 3 and 5 seconds

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(pingTimer);
    };
  }, []);

  const toggleChatBox = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsChatBoxVisible(!isChatBoxVisible);
      setTimeout(() => setIsAnimating(false), 300);
      setShowPing(false); // Hide ping when chat box is opened
    }
  };

  return (
    <>
      <div
        className={`chat-icon ${isChatBoxVisible ? 'chat-icon-hidden' : ''} ${isMobile ? 'mobile-chat-icon' : ''} ${isAnimating ? 'chat-icon-animate' : ''}`}
        onClick={toggleChatBox}
      >
        {showPing && !isChatBoxVisible && (
          <span className="ping-notification">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-100 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </span>
        )}
      </div>
      {isChatBoxVisible && (
        <ChatBox
          isVisible={isChatBoxVisible}
          onClose={toggleChatBox}
          predefinedMessages={predefinedMessages}
          messages={messages}
          setMessages={setMessages}
          businessId={businessId}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default ChatIcon;