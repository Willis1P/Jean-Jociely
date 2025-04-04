import React from 'react';

const GiftMessage = () => {
  return (
    <div className="my-8 text-center px-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
      <h2 className="font-script text-3xl text-wedding-dark-green mb-4">
        Operação Lua de Mel
      </h2>
      <p className="font-serif text-lg text-wedding-dark-gray mb-4">
        Queridos amigos e familiares, pretendemos fazer uma viagem de Lua de Mel, mas só será possível com a sua ajuda!
      </p>
      <p className="font-serif text-lg text-wedding-dark-gray mb-4">
        Esqueceu o dinheiro?
      </p>
      <div className="flex flex-col items-center gap-4">
        <p className="font-script text-2xl text-wedding-dark-green">
          Faz um Pix
        </p>
        <div className="flex flex-col items-center bg-wedding-light-green/20 p-6 rounded-lg">
          <p className="text-wedding-dark-gray font-medium">
            Chave pix: (27) 99848-1592
          </p>
          <p className="text-wedding-dark-gray font-medium mb-4">
            Nome: Jean Sandrini
          </p>
          <img 
            src="/assets/images/lua-de-mel-qr.jpg" 
            alt="QR Code PIX Lua de Mel" 
            className="max-w-[200px] h-auto border-4 border-wedding-medium-green p-1 rounded-md bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default GiftMessage;
