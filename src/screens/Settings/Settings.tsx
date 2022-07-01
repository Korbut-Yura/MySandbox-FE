import {Screen} from 'components';
import {ThemeContext, THEMES} from 'contexts';
import {useAnimatedThemeColors} from 'hooks';
import React, {ReactNode, useCallback} from 'react';
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Switch, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const Settings: React.FC<{children: ReactNode}> = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  const onValueChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const rStyle = useAnimatedThemeColors({color: 'foreground_main'});

  return (
    <Screen>
      <View style={styles.row}>
        <Animated.Text style={rStyle}> Dark Theme</Animated.Text>
        <Switch value={theme === THEMES.DARK} onValueChange={onValueChange} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
