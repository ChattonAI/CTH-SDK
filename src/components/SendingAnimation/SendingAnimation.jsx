import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-light-react';

const SendingAnimation = ({ animationData, isPlaying }) => {
  const lottieRef = useRef();
  return (
    <div className="sending-animation-container">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        containerStyle={{ width: '100%', height: '100%' }}
        isClickToPauseDisabled={true} // Disable click-to-pause functionality
      />
    </div>
  );
};

export default SendingAnimation;
