'use client';
import React, { useEffect, useState } from 'react';

const Timer = ({ className = '' }: { className?: string }) => {
  const MINUTES_IN_MS = 5 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  if (timeLeft === 0) {
    return;
  }

  return (
    <span className={`text-grayColor-300 ${className}`}>
      {minutes}:{second}
    </span>
  );
};

export default Timer;
