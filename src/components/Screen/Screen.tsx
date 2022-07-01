import React, {ReactNode} from 'react';
import {ScrollViewProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {useAnimatedThemeColors} from 'hooks';

export const Screen: React.FC<{children: ReactNode} & ScrollViewProps> = ({
  children,
  ...props
}) => {
  const rStyle = useAnimatedThemeColors({backgroundColor: 'background_dark'});

  return (
    <Animated.ScrollView {...props} style={[rStyle, props.style]}>
      {children}
    </Animated.ScrollView>
  );
};
