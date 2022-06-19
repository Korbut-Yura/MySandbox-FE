import React, {useEffect} from 'react';

import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Tab} from './Tab';
import Svg, {Path} from 'react-native-svg';
import {HOME, RESTOURANS, SALES, BOOKING, SETTINGS} from 'navigation';

const TAB_BAR_HEIGHT = 70;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const ICON_NAMES: {[screen: string]: string} = {
  [HOME]: 'home-outline',
  [RESTOURANS]: 'restaurant-outline',
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
  const scale = useSharedValue(1);
  const SECTION_WIDTH = SCREEN_WIDTH / state.routes.length;

  useEffect(() => {
    scale.value = withSequence(withTiming(0.3, {duration: 200}), withTiming(1));
  }, [selectedTab, scale]);

  const translateX = useDerivedValue(() => {
    return withTiming(SECTION_WIDTH * state.index);
  }, [state.index, selectedTab, SECTION_WIDTH]);

  const rippleX = useDerivedValue(() => {
    return withSpring(SECTION_WIDTH * state.index + SECTION_WIDTH / 2);
  }, [state.index, SECTION_WIDTH]);

  const rippleY = useDerivedValue(() => {
    return withSequence(withTiming(20), withSpring(0));
  }, [state.index]);

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

  const animatedProps = useAnimatedProps(() => {
    const path = `M0,0 C${rippleX.value},${rippleY.value} ${rippleX.value},${rippleY.value} ${SCREEN_WIDTH},0 V${SCREEN_WIDTH},${TAB_BAR_HEIGHT} H0,0  Z`;
    return {
      d: path,
    };
  }, [rippleX, rippleY, SECTION_WIDTH]);

  return (
    <View>
      <Svg style={styles.rippleSVG}>
        <AnimatedPath fill={'#fff'} animatedProps={animatedProps} />
      </Svg>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.activeTab,
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
          console.log(route, options);
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
              options={options as Required<BottomTabNavigationOptions>}
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
    backgroundColor: '#fff',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  rippleSVG: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
  },
});
