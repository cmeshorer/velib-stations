import React from 'react';
import {Text} from 'react-native';
import styles from './styles';
import {TitleTextProps} from './types';

const TitleText = ({text, style}: TitleTextProps) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

export default TitleText;
