import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader.jsx';
import MessageList from '../MessageList/MessageList.jsx';
import InputBox from '../InputBox/InputBox.jsx';
import PredefinedOptions from '../PredefinedOptions/PredefinedOptions.jsx';
import ChatIcon from '../ChatIcon/ChatIcon.jsx';
import TypingIndicator from '../TypingIndicator/TypingIndicator.jsx';
import SendingAnimation from '../SendingAnimation/SendingAnimation.jsx';
import messageListContainer from '../MessageList/MessageList.jsx';


// Main ChatBox Component
const ChatBox = ({ predefinedMessages = [], isVisible, onClose, showPredefinedOptions, onHidePredefined, setMessages, messages, businessId }) => {
  const [isSending, setIsSending] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [predefinedOptions, setPredefinedOptions] = useState(predefinedMessages); // renamed state variable
  const [isClosing, setIsClosing] = useState(false);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const messageListContainer = useRef(null);

  const appendMessage = (messageText, isUser) => {
      setMessages(prevMessages => [...prevMessages, { text: messageText, isUser }]);
  };

  // A function to handle sending messages, both user-typed and predefined
  const sendMessage = async (content, isUser = true) => {
    setIsChatbotTyping(true); // Start the typing animation

    appendMessage(content, true); // true indicates it's a user message

    if (isUser && showPredefinedOptions) {
      onHidePredefined(); // Hide predefined options after first user message
      showPredefinedOptions = false; // Update local state to prevent multiple calls
    }

    if (isUser) {
      setIsSending(true); // Start the sending animation

      const apiEndpoint = 'https://ipcv9qzgyh.execute-api.us-east-1.amazonaws.com/Test';
      const payload = {
        message: content,
        BusinessID: businessId,
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
          appendMessage(data.body, false); // false indicates it's a chatbot message
          // Update the current session ID if provided
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
    setIsClosing(true); // Start the closing animation
    setTimeout(() => {
      onClose(); // This should be the function passed from the parent to hide the chat box
      setIsClosing(false); // Reset the state if the chat box will be shown again later
    }, 700); // This should match the duration of your CSS animation
  };

  /* ChatBox animation */
  const chatBoxClasses = `chat-box ${isClosing ? 'chat-box-slide-out' : (isVisible ? 'chat-box-slide-and-bounce' : '')}`;

// In your JSX, use this function to dynamically set the class
return (
    <div className={chatBoxClasses}>
      <ChatHeader onClose={handleClose} />
      <div className="message-list-container flex-grow" style={{ paddingLeft: '0.800rem', paddingRight: '0.400rem' }} ref={messageListContainer}>

      {/* Pass messages prop directly to MessageList */}
      <MessageList messages={messages} isTyping={isChatbotTyping} />

      </div>
      {/* Conditionally render predefined options */}
      {showPredefinedOptions && predefinedOptions.length > 0 && (
        <PredefinedOptions 
          onSendMessage={sendMessage} 
          predefinedMessages={predefinedMessages} 
          isVisible={showPredefinedOptions}
        />
      )}
      <InputBox onSendMessage={sendMessage} isSending={isSending} />
    </div>
);
};


export default ChatBox;