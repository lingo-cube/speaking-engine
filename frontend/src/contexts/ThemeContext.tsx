/**
 * Theme Context - Theme Switching Infrastructure
 *
 * Provides theme switching functionality between:
 * - Default: Current green/teal/orange palette
 * - Animal Island: Warmer, rounded, game-like tokens
 *
 * Theme preference persists in localStorage.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'animal-island';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'speaking-engine-theme';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'default' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Load from localStorage or use default
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && (stored === 'default' || stored === 'animal-island')) {
      return stored as Theme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'default' ? 'animal-island' : 'default');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
