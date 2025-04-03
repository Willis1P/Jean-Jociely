import React from 'react';

const ParentsNames = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 my-10 px-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <div className="text-center">
        <p className="text-sm uppercase tracking-wider text-wedding-dark-gray/70 mb-2">Pais do Noivo</p>
        <p className="font-serif text-lg md:text-xl text-wedding-dark-gray">
          Nelson Antônio Sandrini & Maria Aparecida Moneque Sandrini
        </p>
      </div>
      
      <div className="hidden md:block h-20 w-px bg-wedding-medium-green"></div>
      <div className="block md:hidden h-px w-20 bg-wedding-medium-green"></div>
      
      <div className="text-center">
        <p className="text-sm uppercase tracking-wider text-wedding-dark-gray/70 mb-2">Pais da Noiva</p>
        <p className="font-serif text-lg md:text-xl text-wedding-dark-gray">
          Josenilson Carpina & Joelma Ramos dos Santos Carpina
        </p>
      </div>
    </div>
  );
};

export default ParentsNames;
