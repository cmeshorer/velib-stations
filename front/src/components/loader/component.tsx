import React from 'react';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../theme';
import {LoaderProps} from './types';

const Loader = ({color, size, style}: LoaderProps) => {
  return (
    <ActivityIndicator
      style={style}
      size={size}
      color={color || theme.purple}
    />
  );
};

export default Loader;
