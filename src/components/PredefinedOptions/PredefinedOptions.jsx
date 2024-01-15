import React, { useState } from 'react';

const PredefinedOptions = ({ onSendMessage, predefinedMessages }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const messages = predefinedMessages || [];

  const handleClick = (message) => {
    setFadeOut(true); // Start fade-out animation
    setTimeout(() => {
      onSendMessage(message);
    }, 350); // After 500ms (animation duration), execute the send message function
  };

  return (
    <div className={`predefined-options-container ${fadeOut ? 'fade-out' : ''}`}>
      {messages.map((message, index) => (
        <button
          key={index}
          className="predefined-option"
          onClick={() => handleClick(message)}
        >
          {message}
        </button>
      ))}
    </div>
  );
};

export default PredefinedOptions;
