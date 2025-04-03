
import React from 'react';

const BibleVerse = () => {
  return (
    <div className="my-10 px-6 md:px-12 text-center max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.7s" }}>
      <div className="py-6 px-4 md:px-8 bg-wedding-light-green/50 rounded-lg">
        <p className="font-script text-xl md:text-2xl text-wedding-dark-green italic mb-3">
          "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito."
        </p>
        <p className="text-sm text-wedding-dark-gray">
          Colossenses 3:14
        </p>
      </div>
    </div>
  );
};

export default BibleVerse;
