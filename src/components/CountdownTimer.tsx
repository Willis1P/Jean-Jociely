import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2025-08-16T16:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 grid grid-cols-4 gap-2 max-w-xs mx-auto">
      <div className="text-center">
        <div className="bg-wedding-light-green/50 rounded-lg p-2">
          <p className="font-serif text-2xl text-wedding-dark-green">{timeLeft.days}</p>
        </div>
        <p className="text-xs mt-1 text-wedding-dark-gray">Dias</p>
      </div>
      <div className="text-center">
        <div className="bg-wedding-light-green/50 rounded-lg p-2">
          <p className="font-serif text-2xl text-wedding-dark-green">{timeLeft.hours}</p>
        </div>
        <p className="text-xs mt-1 text-wedding-dark-gray">Horas</p>
      </div>
      <div className="text-center">
        <div className="bg-wedding-light-green/50 rounded-lg p-2">
          <p className="font-serif text-2xl text-wedding-dark-green">{timeLeft.minutes}</p>
        </div>
        <p className="text-xs mt-1 text-wedding-dark-gray">Minutos</p>
      </div>
      <div className="text-center">
        <div className="bg-wedding-light-green/50 rounded-lg p-2">
          <p className="font-serif text-2xl text-wedding-dark-green">{timeLeft.seconds}</p>
        </div>
        <p className="text-xs mt-1 text-wedding-dark-gray">Segundos</p>
      </div>
    </div>
  );
};

export default CountdownTimer; 