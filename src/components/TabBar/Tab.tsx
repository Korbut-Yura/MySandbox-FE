import React, {useContext, useLayoutEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {ThemeContext} from 'contexts';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type TabBarButtonProps = {
  label: string;
  selectedTab: number;
  onPress: () => void;
  onLongPress: () => void;
  index: number;
  options?: BottomTabNavigationOptions;
  iconName: string;
};

const OFFSET = 20;
export const Tab: React.FC<TabBarButtonProps> = ({
  label,
  selectedTab,
  onPress,
  onLongPress,
  index,
  iconName,
}) => {
  const isFocused = selectedTab === index;
  const animatedValue = useSharedValue(0);
  const {palette} = useContext(ThemeContext);

  useLayoutEffect(() => {
    animatedValue.value = withTiming(isFocused ? 1 : 0);
  }, [isFocused, animatedValue, index, selectedTab]);

  const rIconStyle = useAnimatedStyle(() => {
    return {
      bottom: animatedValue.value * OFFSET,
      color: interpolateColor(
        animatedValue.value,
        [0, 1],
        [palette.inactive, palette.primary_light],
      ),
    };
  });

  const rTextStyle = useAnimatedStyle(() => ({
    opacity: animatedValue.value,
    bottom: animatedValue.value * OFFSET,
    color: palette.primary_light,
  }));

  return (
    <Pressable
      key={label.toString()}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}>
      <AnimatedIcon size={30} name={iconName} style={rIconStyle} />
      <Animated.Text style={[styles.text, rTextStyle]}>{label}</Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tab: {
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
