import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '/Users/neliobarbosa/Coding/chat-sdk-test/src/Images/vector.svg'

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const resizeTextarea = (e) => {
    const minHeight = 58; // Set the minimum height
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.max(e.target.scrollHeight, minHeight)}px`; 
  };

  // Event handler for input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    resizeTextarea(e);
  };

  // Event handler for sending a message
  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Event handler for the Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action to avoid a new line
      handleSendClick();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 p-3">
      <textarea
        className="chat-input no-scrollbar scrollbar-thumb-rounded scrollbar-track-transparent"
        rows="1"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here..."
        maxLength={200} // Limit input to 200 characters
        style={{ lineHeight: '2', overflowY: 'hidden' }} // Hide the scrollbar
        onInput={resizeTextarea} // Adjust the height when the user types
      />
      <button
        className="send-button"
        onClick={handleSendClick}
      >
        <img src={SendIcon} alt="Send" className="send-icon" />
      </button>
    </div>
  );
};

export default InputBox;