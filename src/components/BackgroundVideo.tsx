import React from 'react';

const BackgroundVideo = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute min-w-full min-h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        <source src="/lovable-uploads/wedding-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
    </div>
  );
};

export default BackgroundVideo; 