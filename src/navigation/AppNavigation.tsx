import React, {useCallback} from 'react';
import {
  View,
  useColorScheme,
  StatusBar,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Recipes} from 'screens';
import {
  HOME,
  RESTOURANS,
  SALES,
  BOOKING,
  SETTINGS,
} from './AppNavigation.consts';
import {TabBar} from 'components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const {width, height} = Dimensions.get('window');

const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function HomeScreen() {
  const progress = useSharedValue(1);

  const animatedProps = useAnimatedProps(() => {
    console.log(progress.value);
    return {
      r: (CIRCLE_LENGTH * progress.value) / (2 * Math.PI),
    };
  });

  const rStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, {duration: 2000});
  }, [progress]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Svg style={[{position: 'absolute'}]}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
          style={rStyle}
        />
      </Svg>
      <Pressable onPress={onPress}>
        <Text>press</Text>
      </Pressable>
    </View>
  );
}
export type RootStackParamList = {
  [HOME]: undefined;
  [RESTOURANS]: undefined;
  [SALES]: undefined;
  [BOOKING]: undefined;
  [SETTINGS]: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export const AppNavigation: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['right', 'bottom', 'left']}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Tab.Navigator
            initialRouteName={HOME}
            tabBar={props => <TabBar {...props} />}
            screenOptions={{
              tabBarActiveTintColor: '#673ab7',
              tabBarInactiveTintColor: '#BFCCE4',
            }}>
            <Tab.Screen name={HOME} component={HomeScreen} />
            <Tab.Screen name={RESTOURANS} component={View} />
            <Tab.Screen name={SALES} component={Recipes} />
            <Tab.Screen name={BOOKING} component={View} />
            <Tab.Screen name={SETTINGS} component={View} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
