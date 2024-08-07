import React, { useState, useEffect } from 'react';
import config from '../../config/cth-sdk-config';

const PredefinedOptions = ({ onSendMessage, predefinedMessages, isVisible }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [localIsVisible, setLocalIsVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible && predefinedMessages.length > 0) {
      setLocalIsVisible(true);
      setFadeOut(false);
    } else {
      handleFadeOut();
    }
  }, [isVisible, predefinedMessages]);

  const handleFadeOut = () => {
    setFadeOut(true);
    setTimeout(() => {
      setLocalIsVisible(false);
    }, 350); // Match this with your CSS transition duration
  };

  const handleClick = (message) => {
    setFadeOut(true);
    setTimeout(() => {
      onSendMessage(message);
      handleFadeOut();
    }, 350);
  };
  
  const { textColor, backgroundColor } = config.predefinedOption;

  if (!localIsVisible) return null;

  return (
    <div className={`predefined-options-container ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      {predefinedMessages.map((message, index) => (
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