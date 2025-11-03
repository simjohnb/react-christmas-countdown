import { Settings, Volume2, Snowflake, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ColorTheme } from '../lib/themes';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snowIntensity: number;
  onSnowIntensityChange: (value: number) => void;
  musicVolume: number;
  onMusicVolumeChange: (value: number) => void;
  selectedTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

export default function SettingsPanel({
  open,
  onOpenChange,
  snowIntensity,
  onSnowIntensityChange,
  musicVolume,
  onMusicVolumeChange,
  selectedTheme,
  onThemeChange,
}: SettingsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-background/95 backdrop-blur-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </SheetTitle>
          <SheetDescription>
            Customize your Christmas countdown experience
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Color Theme
            </Label>
            <Select value={selectedTheme} onValueChange={onThemeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic Red & Green</SelectItem>
                <SelectItem value="winter">Winter Blue & White</SelectItem>
                <SelectItem value="royal">Royal Purple & Gold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Snowflake className="w-4 h-4" />
              Snow Intensity
            </Label>
            <Slider
              value={[snowIntensity]}
              onValueChange={(value) => onSnowIntensityChange(value[0])}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground text-right">
              {snowIntensity}%
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Music Volume
            </Label>
            <Slider
              value={[musicVolume]}
              onValueChange={(value) => onMusicVolumeChange(value[0])}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground text-right">
              {musicVolume}%
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
