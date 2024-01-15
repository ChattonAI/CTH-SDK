import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';

const TypingIndicator = ({ isTyping, animationData }) => {
  // Create a ref for the Lottie instance
  const lottieRef = useRef(null);

  useEffect(() => {
    if (isTyping && lottieRef.current) {
      lottieRef.current.play();
    } else if (lottieRef.current) {
      lottieRef.current.stop();
    }
  }, [isTyping]);

  return (
    <div className="typing-indicator">
      <Lottie
        options={{
          loop: true,
          autoplay: false, // Start animation based on isTyping
          animationData: animationData,
        }}
        height={50}
        width={50}
        isStopped={!isTyping}
        isPaused={!isTyping}
        ref={lottieRef}
      />
    </div>
  );
};

export default TypingIndicator;
