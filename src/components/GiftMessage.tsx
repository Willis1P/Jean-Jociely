
import React from 'react';

const GiftMessage = () => {
  return (
    <div className="my-8 text-center px-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
      <p className="font-serif text-lg text-wedding-dark-gray mb-4">
        O melhor presente é sua presença.
      </p>
      <p className="font-script text-xl text-wedding-dark-green mb-6">
        Caso queira nos presentear, sugerimos uma contribuição via Pix
      </p>
      <div className="flex justify-center">
        <img 
          src="/lovable-uploads/b4c561f6-a279-4583-bd70-17d404f6d1ca.png" 
          alt="QR Code PIX" 
          className="max-w-[200px] h-auto border-4 border-wedding-medium-green p-1 rounded-md"
        />
      </div>
      <p className="mt-4 text-sm text-wedding-dark-gray/80">
        @jean.sandrini
      </p>
    </div>
  );
};

export default GiftMessage;
