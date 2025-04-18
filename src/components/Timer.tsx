
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimerProps {
  onComplete: () => void;
  initialMinutes?: number;
}

export const Timer = ({ onComplete, initialMinutes = 25 }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000) as unknown as number;
    } else if (timeLeft === 0) {
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => setIsActive(!isActive);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={cn(
        "text-6xl font-bold font-mono",
        "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent",
        "transition-all duration-300"
      )}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <Button 
        onClick={toggleTimer}
        className={cn(
          "px-8 py-2 text-lg",
          isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        )}
      >
        {isActive ? 'Pause' : 'Start Focus'}
      </Button>
    </div>
  );
};
