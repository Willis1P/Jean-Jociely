import React, { useState } from 'react';

const BackgroundVideo = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/assets/images/wedding-bg-poster.jpg"
          onError={() => setVideoError(true)}
        >
          <source src="/assets/videos/wedding-bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/images/wedding-bg-poster.jpg)' }}
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default BackgroundVideo; 