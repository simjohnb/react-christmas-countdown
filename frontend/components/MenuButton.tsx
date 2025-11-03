import { Menu, Share2, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface MenuButtonProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  onSettingsClick: () => void;
}

export default function MenuButton({ selectedYear, onYearChange, onSettingsClick }: MenuButtonProps) {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 16 }, (_, i) => currentYear + i);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Join me in counting down to Christmas ${selectedYear}! 🎄✨`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Christmas Countdown', text, url });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: 'Link copied!',
          description: 'Share link copied to clipboard',
        });
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        toast({
          title: 'Error',
          description: 'Failed to copy link',
          variant: 'destructive',
        });
      }
    }
  };

  const handleViewCode = () => {
    window.open('https://github.com', '_blank');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="backdrop-blur-md bg-white/20 hover:bg-white/30 border-white/20"
        >
          <Menu className="w-5 h-5 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-lg">
        <DropdownMenuLabel>Christmas Year</DropdownMenuLabel>
        <div className="px-2 py-2">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => onYearChange(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSettingsClick}>
          <Menu className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share Countdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewCode}>
          <Code className="w-4 h-4 mr-2" />
          View Code
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
