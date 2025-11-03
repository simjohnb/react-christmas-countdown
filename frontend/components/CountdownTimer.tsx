import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import type { ColorTheme } from '../lib/themes';
import { themes } from '../lib/themes';

interface CountdownTimerProps {
  selectedYear: number;
  onChristmas: (isChristmas: boolean) => void;
  theme: ColorTheme;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ selectedYear, onChristmas, theme }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(selectedYear, 11, 25);
      const now = new Date();
      const difference = christmas.getTime() - now.getTime();

      if (difference <= 0) {
        onChristmas(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      onChristmas(false);

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedYear, onChristmas]);

  const themeColors = themes[theme];

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className="w-6 h-6 text-white" />
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            Christmas {selectedYear}
          </h2>
        </div>
        <p className="text-white/90 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          Countdown in Progress
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([key, value], index) => (
          <Card
            key={key}
            className={`${themeColors.card} backdrop-blur-md border-white/20 shadow-xl hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6 text-center">
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${themeColors.text} drop-shadow-lg`}>
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-white/80 uppercase tracking-wider font-semibold">
                {key}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <div className="mt-8 text-center animate-in fade-in zoom-in duration-1000">
          <h3 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            🎅 Merry Christmas! 🎄
          </h3>
          <p className="text-xl text-white/90">
            The most wonderful time of the year is here!
          </p>
        </div>
      )}
    </div>
  );
}
