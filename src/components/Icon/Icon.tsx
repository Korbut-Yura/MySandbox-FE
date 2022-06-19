import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {IconProps} from 'react-native-vector-icons/Icon';

interface Props extends IconProps {
  family?: string;
}

export enum FAMILIES {
  ionicon = 'Ionicon',
  fontAwesome = 'FontAwesome',
}
const types = {
  [FAMILIES.ionicon]: Ionicon,
  [FAMILIES.fontAwesome]: FAIcon,
};

const getType = (family: FAMILIES) => types[family] || FAIcon;

export const Icon: React.FC<Props> = ({
  name = 'home',
  family = 'material',
  size = 16,
  color = '#9C26B0',
  ...rest
}) => {
  const [type, id] = (
    name.includes(':') ? name : `${family || 'font-awesome'}:${name}`
  ).split(':');
  const IconInstance = getType(type as FAMILIES);

  return <IconInstance name={id} size={size} color={color} {...rest} />;
};
