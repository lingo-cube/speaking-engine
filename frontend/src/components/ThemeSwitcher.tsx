import { useTheme, Theme } from '../contexts/ThemeContext';
import { Button } from './primitives';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'default' ? 'Animal Island' : 'Default'} theme`}
      aria-pressed={theme === 'animal-island'}
      className="w-9 h-9 px-0"
    >
      {theme === 'default' ? '🌿' : '🦁'}
    </Button>
  );
}
