import React from 'react';
import CloseIcon from '../../Images/exit.svg';
import HeaderIcon from '../../Images/SvgjsG1174.png';
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
          powered <a href="https://neliobarbosa67.wixstudio.io/mysite" style={{ textDecoration: 'none' }}>by CHATTONAI</a>
        </div>
      </div>
      
      {/* Header Icon */}
      <img
        className="w-4 h-8" // Adjust size as needed
        src={HeaderIcon} // Update with the correct path
        alt="Header Icon"
      />
    </div>
  );
};

export default ChatHeader;
