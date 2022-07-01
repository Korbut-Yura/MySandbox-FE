import React, {ReactNode} from 'react';
import {ScrollViewProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {useAnimatedThemeColors} from 'hooks';
import {COLORS} from 'contexts';

export const Screen: React.FC<{children: ReactNode} & ScrollViewProps> = ({
  children,
  ...props
}) => {
  const rStyle = useAnimatedThemeColors({backgroundColor: COLORS.BACKGROUND});

  return (
    <Animated.ScrollView {...props} style={[rStyle, props.style]}>
      {children}
    </Animated.ScrollView>
  );
};
