import {ThemeContext, themes, THEMES} from 'contexts';
import {useContext} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ColorNames = keyof typeof themes[THEMES];

const DURATION = 350;

export const useThemeProgress = () => {
  const {theme} = useContext(ThemeContext);
  const themeProgress = useSharedValue(theme === THEMES.DARK ? 1 : 0);

  useAnimatedReaction(
    () => theme,
    (next, prev) => {
      if (next !== prev && prev !== null) {
        theme === THEMES.LIGHT
          ? (themeProgress.value = withTiming(0, {duration: DURATION}))
          : (themeProgress.value = withTiming(1, {duration: DURATION}));
      }
    },
    [theme],
  );

  return themeProgress;
};

export const useAnimatedThemeColors = (config: {
  [key in keyof (ViewStyle & TextStyle)]: ColorNames;
}) => {
  const themeProgress = useThemeProgress();
  return useAnimatedStyle(() => {
    return Object.entries(config).reduce((acc, [key, colorName]) => {
      return {
        ...acc,
        [key]: interpolateColor(
          themeProgress.value,
          [0, 1],
          [themes[THEMES.LIGHT][colorName], themes[THEMES.DARK][colorName]],
        ),
      };
    }, {});
  }, []);
};
