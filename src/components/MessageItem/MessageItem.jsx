import React from 'react';
import LinkifiedText from '../../utils/linkify.jsx';
import config from '../../config/cth-sdk-config';

const MessageItem = ({ message, isUser }) => {
  // Destructuring for easier access to config properties
  const { textStyle } = config.message;
  const { backgroundColor } = config.userMessage;
  const { border, borderColor } = config.assistantMessage;

  // Styles for user and assistant message bubbles
  const messageBubbleBaseStyles = `${textStyle} p-3 rounded-2xl break-words`;
  const userMessageStyles = `${backgroundColor} ${messageBubbleBaseStyles} max-w-[calc(100%-3rem)] self-end`; // Adjust as needed
  const assistantMessageStyles = `${border} ${borderColor} ${messageBubbleBaseStyles} max-w-[calc(100%-3rem)] self-start`; // Adjust as needed
  const slideInAnimation = "slide-in"; // Assuming you have this animation defined elsewhere

  // Combining styles based on whether the message is from the user or the assistant
  const messageStyles = `${isUser ? userMessageStyles : assistantMessageStyles} ${slideInAnimation}`;

  return (
    <div className={messageStyles}>
      <LinkifiedText text={message.text} />
    </div>
  );
};

export default MessageItem;

