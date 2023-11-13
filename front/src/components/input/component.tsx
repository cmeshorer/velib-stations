import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';
import {InputProps} from './types';

const Input = ({
  placeholder,
  onChangeText,
  value,
  isPassword,
  style,
}: InputProps) => {
  return (
    <TextInput
      secureTextEntry={isPassword}
      style={[styles.container, style]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default Input;
