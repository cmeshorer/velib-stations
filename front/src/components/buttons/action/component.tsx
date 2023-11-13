import React from 'react';
import {Button} from 'react-native';
import {theme} from '../../../theme';
import {ActionButtonProps} from './types';

const ActionButton = ({title, onPress, disabled}: ActionButtonProps) => {
  return (
    <Button
      color={theme.purple}
      title={title}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export default ActionButton;
