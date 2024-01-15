import React, { useState, useEffect } from 'react';
import ChatHeader from '/Users/neliobarbosa/Coding/chat-sdk-test/src/components/ChatHeader/ChatHeader.jsx';
import MessageList from '/Users/neliobarbosa/Coding/chat-sdk-test/src/components/MessageList/MessageList.jsx';
import InputBox from '/Users/neliobarbosa/Coding/chat-sdk-test/src/components/InputBox/InputBox.jsx';
import PredefinedOptions from '/Users/neliobarbosa/Coding/chat-sdk-test/src/components/PredefinedOptions/PredefinedOptions.jsx';
import ChatIcon from '/Users/neliobarbosa/Coding/chat-sdk-test/src/components/ChatIcon/ChatIcon.jsx';
import typingAnimationData from '/Users/neliobarbosa/Coding/chat-sdk-test/src/Animations/Typing-Indicator-Animation.json';
import TypingIndicator from '/Users/neliobarbosa/Coding/chat-sdk-test/src/components/TypingIndicator/TypingIndicator.jsx';


// Main ChatBox Component
const ChatBox = ({ predefinedMessages = [], isVisible, onClose, showPredefinedOptions, messages, onSendMessage}) => {
  const [isSending, setIsSending] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [predefinedOptions, setPredefinedOptions] = useState(predefinedMessages); // renamed state variable
  const [businessId, setBusinessId] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);


  console.log("Predefined Messages:", predefinedMessages);
  console.log("Show Predefined Options:", showPredefinedOptions);

  // A function to handle sending messages, both user-typed and predefined
  const sendMessage = async (content, isUser = true) => {
  setIsChatbotTyping(true); // Start the typing animation
  // Pass the message content to the parent's onSendMessage
  onSendMessage(content);

  // If the message is from the user, send to the chatbot's endpoint
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        // Append bot response to messages (parent will handle it)
        onSendMessage(data.body, false);

        // Update the current session ID
        if (data.session_id) {
          setCurrentSessionId(data.session_id);
        }
      } else {
        console.error('API request failed:', response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false); // Stop the sending animation
      setIsChatbotTyping(false); // Stop the typing animation
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

  // Initialization using useEffect hook
  useEffect(() => {
  // Define a function that updates the component's state based on the input options
  const initSDK = (options) => {
    console.log("Options in initSDK: ", options); // Debug log

    // Set predefined messages and show options
    setPredefinedOptions(options.predefinedMessages || ["Default message 1", "Default message 2"]);
  };

  // Attach the init function to the window object
  window.ChattonAI_Chatbot_SDK = { init: initSDK };

  // Clean up the global function when the component unmounts
  return () => {
    window.ChattonAI_Chatbot_SDK.init = () => { };
  };
}, []);




// In your JSX, use this function to dynamically set the class
  return (
    <div className={chatBoxClasses}>
      <ChatHeader onClose={handleClose} />
      <div className="message-list-container flex-grow" style={{ paddingLeft: '0.800rem', paddingRight: '0.400rem' }}>

      <MessageList messages={messages} isTyping={isChatbotTyping} />
      </div>
      {/* Conditionally render predefined options using predefinedOptions state */}
      {showPredefinedOptions && predefinedOptions.length > 0 && (
        // In ChatBox component
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