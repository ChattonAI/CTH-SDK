import React from 'react';
import CloseIcon from '/Users/neliobarbosa/Coding/chat-sdk-test/src/Images/exit.svg';

const ChatHeader = ({ onClose }) => {
  return (
    <div className="chat-header"> {/* Removed the inline styles for width, height, padding, and border-radius */}
      {/* Close button with icon */}
     <button className="focus:outline-none" onClick={onClose}>
        <img className="w-3 h-3" src={CloseIcon} alt="Close" />
      </button>
      
      {/* Centered content */}
      <div className="header-content">
        {/* Assistant title */}
        <div className="text-white text-lg font-extrabold">Assistant</div>
        
        {/* Subtitle "powered by chattonai" */}
        <div className="powered-by text-neutral-400 text-xs font-light uppercase leading-3" style={{ fontSize: '0.5rem' }}>
          powered by chattonai
        </div>
      </div>
      
      {/* Header Icon */}
      <img
        className="w-12 h-12 rounded-full" // Adjusted size using Tailwind's size notation
        src={require("/Users/neliobarbosa/Coding/chat-sdk-test/src/Images/image 14.png")} // Replace with your actual header icon path
        alt="Header Icon"
      />
    </div>
  );
};

export default ChatHeader;
