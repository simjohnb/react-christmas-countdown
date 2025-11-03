export type ColorTheme = 'classic' | 'winter' | 'royal';

export interface Theme {
  gradient: string;
  card: string;
  text: string;
  sparkle: string;
  progressStart: string;
  progressEnd: string;
}

export const themes: Record<ColorTheme, Theme> = {
  classic: {
    gradient: 'bg-gradient-to-br from-red-900 via-green-900 to-red-900',
    card: 'bg-red-500/20',
    text: 'text-red-100',
    sparkle: 'bg-yellow-300',
    progressStart: '#ef4444',
    progressEnd: '#22c55e',
  },
  winter: {
    gradient: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900',
    card: 'bg-blue-500/20',
    text: 'text-blue-100',
    sparkle: 'bg-cyan-300',
    progressStart: '#3b82f6',
    progressEnd: '#06b6d4',
  },
  royal: {
    gradient: 'bg-gradient-to-br from-purple-900 via-yellow-900 to-purple-900',
    card: 'bg-purple-500/20',
    text: 'text-purple-100',
    sparkle: 'bg-amber-300',
    progressStart: '#a855f7',
    progressEnd: '#fbbf24',
  },
};
