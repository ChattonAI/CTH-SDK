import React, { useEffect, useRef } from 'react';
import Lottie from "lottie-light-react";

const TypingIndicator = ({ isTyping, animationData }) => {
  // Create a ref for the Lottie instance
  const lottieRef = useRef();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default click behavior
  };

  useEffect(() => {
    if (isTyping && lottieRef.current) {
      lottieRef.current.play();
    } else if (lottieRef.current) {
      lottieRef.current.stop();
    }
  }, [isTyping]);

  return (
    <div className="typing-indicator" onClick={handleClick}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        height={50}
        width={50}
        isStopped={!isTyping}
        ref={lottieRef}
        isClickToPauseDisabled={true} // Disable click-to-pause functionality
      />
    </div>
  );
};

export default TypingIndicator;
