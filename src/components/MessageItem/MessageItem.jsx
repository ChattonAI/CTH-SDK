import React from 'react';
import LinkifiedText from '../../utils/linkify.jsx';

const MessageItem = ({ message, isUser }) => {
  // Styles for user and assistant message bubbles
  const messageBubbleBaseStyles = "text-neutral-400 text-sm p-3 rounded-2xl break-words";
  const userMessageStyles = `bg-zinc-800 ${messageBubbleBaseStyles} max-w-[calc(100%-3rem)] self-end`; // 3rem is for total horizontal padding; adjust as needed
  const assistantMessageStyles = `border border-zinc-800 ${messageBubbleBaseStyles} max-w-[calc(100%-3rem)] self-start`; // Same here
  const slideInAnimation = "slide-in"; // Animation class

  // Combining styles based on whether the message is from the user or assistant
  const messageStyles = `${isUser ? userMessageStyles : assistantMessageStyles} ${slideInAnimation}`;

  return (
    <div className={messageStyles}>
      <LinkifiedText text={message.text} />
    </div>
  );
};

export default MessageItem;

