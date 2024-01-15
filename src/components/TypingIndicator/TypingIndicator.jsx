import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';

const TypingIndicator = ({ isTyping, animationData }) => {
  // Create a ref for the Lottie instance
  const lottieRef = useRef(null);

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
        options={{
          loop: true,
          autoplay: false, // Start animation based on isTyping
          animationData: animationData,
        }}
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
