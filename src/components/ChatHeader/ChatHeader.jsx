import React from 'react';
import CloseIcon from '../../Images/black-exit.svg';
import HeaderIcon from '../../Images/ChattonAI_logo_Q2.png';
import config from '../../config/cth-sdk-config';

const ChatHeader = ({ onClose }) => {
  // Destructuring for easier access to config properties
  const { backgroundColor, height, assistantTextColor, PBCTextColor } = config.chatHeader;
  return (
    <div className={`chat-header ${backgroundColor} ${height} bg-opacity-75`}>
      {/* Close button with icon */}
      <button className="close-icon focus:outline-none" onClick={onClose}>
        <img className="w-3 h-3" src={CloseIcon} alt="Close" />
      </button>
      
      {/* Centered content */}
      <div className="header-content">
        {/* Assistant title */}
        <div className={`${assistantTextColor} text-lg font-extrabold`}>Assistant</div>

        {/* Subtitle "powered by CHATTONAI" */}
        <div className={`powered-by ${PBCTextColor} text-xs font-light uppercase leading-3`} style={{ fontSize: '0.5rem' }}>
          powered <a href="https://chattonai.com" style={{ textDecoration: 'none' }}>by CHATTONAI</a>
        </div>
      </div>
      
      {/* Header Icon */}
      <img
        className="w-8 h-8" // Adjust size as needed
        src={HeaderIcon}
        alt="Header Icon"
      />
    </div>
  );
};

export default ChatHeader;
