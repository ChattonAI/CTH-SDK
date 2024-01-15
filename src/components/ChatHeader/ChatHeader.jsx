import React from 'react';
import CloseIcon from '/Users/neliobarbosa/Coding/chat-sdk-test/src/Images/exit.svg';

const ChatHeader = ({ onClose }) => {
  return (
    <div className="chat-header"> {/* Removed the inline styles for width, height, padding, and border-radius */}
      {/* Close button with icon */}
     <button className="close-icon focus:outline-none" onClick={onClose}>
        <img className="w-3 h-3" src={CloseIcon} alt="Close" />
      </button>
      
      {/* Centered content */}
      <div className="header-content">
        {/* Assistant title */}
        <div className="text-white text-lg font-extrabold">Assistant</div>
        
        {/* Subtitle "powered by chattonai" */}
        <div className="powered-by text-neutral-400 text-xs font-light uppercase leading-3" style={{ fontSize: '0.5rem' }}>
          powered <a href="https://neliobarbosa67.wixstudio.io/mysite" style={{ textDecoration: 'none' }}>chattonai</a>
        </div>
      </div>
      
      {/* Header Icon */}
      <img
        className="w-4 h-8" // Adjusted size using Tailwind's size notation
        src={require("/Users/neliobarbosa/Coding/chat-sdk-test/src/Images/SvgjsG1174.png")} // Replace with your actual header icon path
        alt="Header Icon"
      />
    </div>
  );
};

export default ChatHeader;
