import React from 'react';

const PredefinedOptions = ({ onSendMessage, predefinedMessages, isVisible }) => {
  // Fallback if predefinedMessages is undefined
  const messages = predefinedMessages || [];

  if (!isVisible) {
    return null; // Do not render anything if not visible
  }
  
  return (
    <div className="predefined-options-container">
      {messages.map((message, index) => (
        <button
          key={index} // Use index as key for simplicity, ensure messages are unique if using message as key
          className="predefined-option"
          onClick={(e) => {
            e.preventDefault();
            onSendMessage(message);
          }}
        >
          {message}
        </button>
      ))}
    </div>
  );
};

export default PredefinedOptions;
