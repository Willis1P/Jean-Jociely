import React from 'react';

const AdditionalInstructions = () => {
  return (
    <div className="my-10 px-4 md:px-8 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.9s" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-lg bg-wedding-light-green/50">
          <p className="font-serif text-wedding-dark-green text-lg mb-2">Pontualidade</p>
          <p className="text-sm text-wedding-dark-gray">Chegue com 30 minutos de antecedência</p>
        </div>
        
        <div className="p-4 rounded-lg bg-wedding-light-green/50">
          <p className="font-serif text-wedding-dark-green text-lg mb-2">Fotos</p>
          <p className="text-sm text-wedding-dark-gray">Tire muitas fotos para recordarmos juntos</p>
        </div>
        
        <div className="p-4 rounded-lg bg-wedding-light-green/50">
          <p className="font-serif text-wedding-dark-green text-lg mb-2">Presentes</p>
          <p className="text-sm text-wedding-dark-gray">Confira nossa lista de presentes no menu abaixo</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInstructions;
