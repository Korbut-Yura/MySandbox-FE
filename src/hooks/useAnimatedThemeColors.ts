import {COLORS} from 'contexts';
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

export const useAnimatedThemeColors = (config: {
  [key in keyof (ViewStyle & TextStyle)]: COLORS;
}) => {
  const {themeName} = useContext(ThemeContext);
  const themeProgress = useSharedValue(themeName === THEMES.DARK ? 1 : 0);

  useAnimatedReaction(
    () => themeName,
    (next, prev) => {
      if (next !== prev && prev !== null) {
        themeName === THEMES.LIGHT
          ? (themeProgress.value = withTiming(0, {duration: 500}))
          : (themeProgress.value = withTiming(1, {duration: 500}));
      }
    },
    [themeName],
  );

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
