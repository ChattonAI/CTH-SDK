import React from 'react';
import LinkifiedText from '/Users/neliobarbosa/Coding/chat-sdk-test/src/utils/linkify.jsx'; // Adjust the import path to where you place the LinkifiedText.js file
import MessageItem from '../MessageItem/MessageItem';
import typingAnimationData from '/Users/neliobarbosa/Coding/chat-sdk-test/src/Animations/Typing-Indicator-Animation.json';
import TypingIndicator from '/Users/neliobarbosa/Coding/chat-sdk-test/src/components/TypingIndicator/TypingIndicator.jsx';  


const MessageList = ({ messages, isTyping }) => {
  return (
    <div className="message-list-container scrollbar flex flex-col gap-2 p-1">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} isUser={message.isUser} />
      ))}
      {isTyping && (
        <div className="typing-indicator-container flex items-end"> {/* Position at the bottom */}
          <TypingIndicator isTyping={isTyping} animationData={typingAnimationData} />
        </div>
      )}
    </div>
  );
};

export default MessageList;
