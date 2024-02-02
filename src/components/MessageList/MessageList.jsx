import React, { useEffect, useRef } from 'react';
import LinkifiedText from '../../utils/linkify.jsx';
import MessageItem from '../MessageItem/MessageItem';
import typingAnimationData from '../../Animations/Typing-Indicator-Animation.json';
import TypingIndicator from '../TypingIndicator/TypingIndicator.jsx';

const MessageList = ({ messages, isTyping, messageListRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const shouldAutoScroll = messages.length > 4;
    if (containerRef.current && shouldAutoScroll) {
      const { scrollHeight, clientHeight } = containerRef.current;
      const hasOverflow = scrollHeight > clientHeight;

      if (hasOverflow) {
        containerRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }
  }, [messages]);

  return (
    <div className="message-list-container scrollbar flex flex-col gap-2 p-1" ref={containerRef}>
      {messages.map((message, index) => ( // Added index for key
        <MessageItem key={index} message={message} isUser={message.isUser} />
      ))}
      {isTyping && (
        <div className="typing-indicator-container flex items-end">
          <TypingIndicator isTyping={isTyping} animationData={typingAnimationData} />
        </div>
      )}
    </div>
  );
};

export default MessageList;

