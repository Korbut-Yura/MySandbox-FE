import React, {ReactNode} from 'react';
import {useCallback} from 'react';

export enum THEMES {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum COLORS {
  'FOREGROUND' = 'foreground',
  'BACKGROUND' = 'background',
}

export const themes: {[theme in THEMES]: {[colorName in COLORS]: string}} = {
  [THEMES.LIGHT]: {
    [COLORS.FOREGROUND]: '#000000',
    [COLORS.BACKGROUND]: '#eeeeee',
  },
  [THEMES.DARK]: {
    [COLORS.FOREGROUND]: '#ffffff',
    [COLORS.BACKGROUND]: '#222222',
  },
};

export const ThemeContext = React.createContext<{
  theme: {[name: string]: string};
  themeName: THEMES;
  toggleTheme: () => void;
}>({
  theme: themes[THEMES.LIGHT],
  themeName: THEMES.LIGHT,
  toggleTheme: () => {},
});

export const ThemeContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [themeName, setThemeName] = React.useState(THEMES.LIGHT);

  const toggleTheme = useCallback(() => {
    setThemeName(prev => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  }, []);

  const value = {
    theme: themes[themeName],
    toggleTheme,
    themeName,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
