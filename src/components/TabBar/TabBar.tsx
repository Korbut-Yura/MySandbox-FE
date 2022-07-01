import React, {useEffect} from 'react';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Tab} from './Tab';
import Svg, {Path} from 'react-native-svg';
import {HOME, LIST, SALES, BOOKING, SETTINGS} from 'navigation';
import {useAnimatedThemeColors, useThemeProgress} from 'hooks';
import {themes, THEMES} from 'contexts';

const TAB_BAR_HEIGHT = 70;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const ICON_NAMES: {[screen: string]: string} = {
  [HOME]: 'home-outline',
  [LIST]: 'restaurant-outline',
  [SALES]: 'pricetags-outline',
  [BOOKING]: 'today-outline',
  [SETTINGS]: 'settings-outline',
};

export const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const selectedTab = state.index;
  const SECTION_WIDTH = SCREEN_WIDTH / state.routes.length;
  const scale = useSharedValue(1);
  const translateX = useSharedValue(SECTION_WIDTH * state.index);
  const rippleX = useSharedValue(SECTION_WIDTH / 2);
  const rippleY = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(withTiming(0.3, {duration: 200}), withTiming(1));
    translateX.value = withTiming(SECTION_WIDTH * selectedTab);
    rippleX.value = withSpring(SECTION_WIDTH * selectedTab + SECTION_WIDTH / 2);
    rippleY.value = withSequence(withTiming(20), withSpring(0));
  }, [selectedTab, rippleY, scale, translateX, rippleX, SECTION_WIDTH]);

  const rStyle = useAnimatedStyle(() => {
    return {
      left: translateX.value,
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  const themeProgress = useThemeProgress();

  const animatedProps = useAnimatedProps(() => {
    const path = `M0,0 C${rippleX.value},${rippleY.value} ${rippleX.value},${rippleY.value} ${SCREEN_WIDTH},0 V${SCREEN_WIDTH},${TAB_BAR_HEIGHT} H0,0  Z`;
    return {
      d: path,
      fill: interpolateColor(
        themeProgress.value,
        [0, 1],
        [
          themes[THEMES.LIGHT].background_main,
          themes[THEMES.DARK].background_main,
        ],
      ),
    };
  }, [rippleX, rippleY, SECTION_WIDTH]);

  const rActiveTabStyle = useAnimatedThemeColors({
    backgroundColor: 'background_light',
  });

  return (
    <View>
      <Svg style={styles.rippleSVG}>
        <AnimatedPath animatedProps={animatedProps} />
      </Svg>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.activeTab,
            rActiveTabStyle,
            {
              height: SECTION_WIDTH,
              width: SECTION_WIDTH,
              borderRadius: SECTION_WIDTH / 2,
            },
            rStyle,
          ]}
        />
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                params: route.params,
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Tab
              key={label.toString()}
              selectedTab={selectedTab}
              label={label.toString()}
              onPress={onPress}
              onLongPress={onLongPress}
              index={index}
              iconName={ICON_NAMES[route.name]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  activeTab: {
    position: 'absolute',
    bottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  rippleSVG: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
  },
});
