import React, { useState } from 'react';
import config from '../../config/cth-sdk-config';

const PredefinedOptions = ({ onSendMessage, predefinedMessages }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const messages = predefinedMessages || [];

  const handleClick = (message) => {
    setFadeOut(true); // Start fade-out animation
    setTimeout(() => {
      onSendMessage(message);
    }, 350); // After 500ms (animation duration), execute the send message function
  };
  
  const { textColor, backgroundColor } = config.predefinedOption;

  return (
    <div className={`predefined-options-container ${fadeOut ? 'fade-out' : ''}`}>
      {messages.map((message, index) => (
        <button
          key={index}
          className={`predefined-option ${backgroundColor} ${textColor} bg-opacity-80`}
          onClick={() => handleClick(message)}
        >
          {message}
        </button>
      ))}
    </div>
  );
};

export default PredefinedOptions;
