import React from 'react';
import {useColorScheme, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Settings} from 'screens';
import {HOME, LIST, SALES, BOOKING, SETTINGS} from './AppNavigation.consts';
import {Screen, TabBar} from 'components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

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
            <Tab.Screen name={HOME} component={Screen} />
            <Tab.Screen name={LIST} component={Screen} />
            <Tab.Screen name={SALES} component={Screen} />
            <Tab.Screen name={BOOKING} component={Screen} />
            <Tab.Screen name={SETTINGS} component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
