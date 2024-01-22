import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-light-react';

const SendingAnimation = ({ animationData, isPlaying }) => {
  const lottieRef = useRef(null);
  return (
    <div className="sending-animation-container">
      <Lottie
        ref={lottieRef}
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
        }}
        containerStyle={{ width: '100%', height: '100%' }}
        isClickToPauseDisabled={true} // Disable click-to-pause functionality
      />
    </div>
  );
};

export default SendingAnimation;
