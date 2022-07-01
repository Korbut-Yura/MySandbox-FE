import React from 'react';
import {useColorScheme, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Settings} from 'screens';
import {HOME, LIST, SALES, BOOKING, SETTINGS} from './AppNavigation.consts';
import {Screen, TabBar} from 'components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {useAnimatedThemeColors} from 'hooks';
import {useTheme} from 'contexts';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
export type RootStackParamList = {
  [HOME]: undefined;
  [LIST]: undefined;
  [SALES]: undefined;
  [BOOKING]: undefined;
  [SETTINGS]: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export const AppNavigation: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const rStyle = useAnimatedThemeColors({backgroundColor: 'background_main'});

  const {palette} = useTheme();
  return (
    <SafeAreaProvider>
      <AnimatedSafeAreaView
        style={[{flex: 1}, rStyle]}
        edges={['right', 'bottom', 'left']}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Tab.Navigator
            initialRouteName={HOME}
            screenOptions={{
              headerTintColor: palette.foreground_main,
              headerBackground: () => (
                <Animated.View style={[{flex: 1}, rStyle]} />
              ),
            }}
            tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name={HOME} component={Screen} />
            <Tab.Screen name={LIST} component={Screen} />
            <Tab.Screen name={SALES} component={Screen} />
            <Tab.Screen name={BOOKING} component={Screen} />
            <Tab.Screen name={SETTINGS} component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </AnimatedSafeAreaView>
    </SafeAreaProvider>
  );
};
