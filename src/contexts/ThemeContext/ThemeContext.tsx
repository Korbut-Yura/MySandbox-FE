import React, {ReactNode} from 'react';
import {useContext} from 'react';
import {useCallback} from 'react';

export enum THEMES {
  LIGHT = 'light',
  DARK = 'dark',
}
const commonColors = {
  primary_light: '#42a5f5',
  primary_main: '#1976d2',
  primary_dark: '#1565c0',
  secondary_light: '#ba68c8',
  secondary_main: '#9c27b0',
  secondary_dark: '#7b1fa2',
  error_light: '#ef5350',
  eror_main: '#d32f2f',
  error_dark: '#c62828',
  warning_light: '#ff9800',
  warning_main: '#ed6c02',
  warning_dark: '#e65100',
  info_light: '#03a9f4',
  info_main: '#0288d1',
  info_dark: '#01579b',
  success_light: '#4caf50',
  success_main: '#2e7d32',
  success_dark: '#1b5e20',
  inactive: '#BFCCE4',
};

export const themes = {
  [THEMES.LIGHT]: {
    ...commonColors,

    foreground_light: '#000000',
    foreground_main: '#000000',
    foreground_dark: '#000000',
    background_light: '#ffffff',
    background_main: '#f2f2f2',
    background_dark: '#dddddd',
  },
  [THEMES.DARK]: {
    ...commonColors,
    foreground_light: '#ffffff',
    foreground_main: '#ffffff',
    foreground_dark: '#ffffff',
    background_light: '#666666',
    background_main: '#444444',
    background_dark: '#222222',
  },
};

export const ThemeContext = React.createContext<{
  palette: typeof themes[THEMES.LIGHT];
  theme: THEMES;
  toggleTheme: () => void;
}>({
  palette: themes[THEMES.LIGHT],
  theme: THEMES.LIGHT,
  toggleTheme: () => {},
});

export const ThemeContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState(THEMES.LIGHT);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  }, []);

  const value = {
    palette: themes[theme],
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
