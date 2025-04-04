
import React from 'react';

const MonogramHeader = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full border-2 border-wedding-medium-green bg-white shadow-md animate-fade-in">
        <span className="text-5xl md:text-6xl font-serif text-wedding-dark-green font-semibold">J</span>
        <span className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-wedding-medium-green text-white font-serif text-lg md:text-xl">&</span>
      </div>
      <h1 className="mt-6 text-3xl md:text-4xl font-serif text-wedding-dark-green tracking-wide animate-fade-in" style={{ animationDelay: "0.2s" }}>
        Jean & Jociely
      </h1>
      <div className="mt-4 h-0.5 w-20 bg-wedding-medium-green animate-fade-in" style={{ animationDelay: "0.3s" }}></div>
    </div>
  );
};

export default MonogramHeader;
