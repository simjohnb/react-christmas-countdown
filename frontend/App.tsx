import { useState, useEffect } from 'react';
import CountdownTimer from './components/CountdownTimer';
import Snowfall from './components/Snowfall';
import Sparkles from './components/Sparkles';
import SantaSleigh from './components/SantaSleigh';
import ConfettiEffect from './components/ConfettiEffect';
import ProgressCircle from './components/ProgressCircle';
import GiftBoxes from './components/GiftBoxes';
import HolidayQuotes from './components/HolidayQuotes';
import SettingsPanel from './components/SettingsPanel';
import MusicPlayer from './components/MusicPlayer';
import MenuButton from './components/MenuButton';
import type { ColorTheme } from './lib/themes';
import { themes } from './lib/themes';

export default function App() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>('classic');
  const [snowIntensity, setSnowIntensity] = useState(50);
  const [musicVolume, setMusicVolume] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  const [isChristmas, setIsChristmas] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const theme = themes[selectedTheme];

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);

  return (
    <div className="dark min-h-screen relative overflow-hidden">
      <div
        className={`min-h-screen transition-all duration-1000 ${theme.gradient}`}
      >
        <Snowfall intensity={snowIntensity} theme={selectedTheme} />
        <Sparkles theme={selectedTheme} />
        <SantaSleigh />
        {isChristmas && <ConfettiEffect />}

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                🎄 Christmas Countdown
              </h1>
            </div>
            <MenuButton
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              onSettingsClick={() => setShowSettings(true)}
            />
          </header>

          <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-8">
            <HolidayQuotes />

            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8">
              <ProgressCircle selectedYear={selectedYear} theme={selectedTheme} />
              <CountdownTimer
                selectedYear={selectedYear}
                onChristmas={setIsChristmas}
                theme={selectedTheme}
              />
            </div>

            <GiftBoxes />
          </main>

          <footer className="p-4 text-center text-white/80 text-sm">
            <p>Wishing you a magical holiday season! ✨</p>
          </footer>
        </div>

        <SettingsPanel
          open={showSettings}
          onOpenChange={setShowSettings}
          snowIntensity={snowIntensity}
          onSnowIntensityChange={setSnowIntensity}
          musicVolume={musicVolume}
          onMusicVolumeChange={setMusicVolume}
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
        />

        <MusicPlayer volume={musicVolume} autoPlay={hasInteracted} />
      </div>
    </div>
  );
}
