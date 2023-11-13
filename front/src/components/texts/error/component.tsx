import React from 'react';
import {Text} from 'react-native';
import styles from './styles';
import {ErrorTextProps} from './types';

const ErrorText = ({style}: ErrorTextProps) => {
  return <Text style={[styles.text, style]}>Une erreur est survenue</Text>;
};

export default ErrorText;
