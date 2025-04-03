import React from 'react';

const EventDetails = () => {
  return (
    <div className="my-10 text-center px-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-wider text-wedding-dark-gray/70 mb-2">
          Data e Hora
        </p>
        <div className="inline-flex items-center">
          <div className="px-4 py-2 border-2 border-wedding-medium-green rounded-l-lg">
            <p className="font-serif text-2xl md:text-3xl text-wedding-dark-green">16</p>
          </div>
          <div className="px-4 py-2 border-t-2 border-b-2 border-wedding-medium-green">
            <p className="font-serif text-2xl md:text-3xl text-wedding-dark-green">08</p>
          </div>
          <div className="px-4 py-2 border-2 border-wedding-medium-green rounded-r-lg">
            <p className="font-serif text-2xl md:text-3xl text-wedding-dark-green">25</p>
          </div>
        </div>
        <p className="mt-4 font-script text-2xl text-wedding-dark-green">
          às 16:00
        </p>
      </div>
      
      <div>
        <p className="text-sm uppercase tracking-wider text-wedding-dark-gray/70 mb-2">
          Local
        </p>
        <h3 className="font-serif text-xl md:text-2xl text-wedding-dark-green">
          São Sebastião Terra Alta
        </h3>
      </div>
    </div>
  );
};

export default EventDetails;
