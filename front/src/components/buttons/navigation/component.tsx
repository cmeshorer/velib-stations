import React from 'react';
import {Link} from '@react-navigation/native';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {NavigationButtonProps} from './types';

const NavigationButton = ({
  text,
  navigateTo,
  onPress,
  style,
}: NavigationButtonProps) => {
  return onPress ? (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.text, style]}>{text}</Text>
    </TouchableOpacity>
  ) : (
    <Link
      // @ts-ignore
      // Issue typing the "screen" key
      // source: https://spin.atomicobject.com/2023/05/10/not-assignable-parameter-never
      to={{screen: navigateTo as string}}
      style={[styles.container, styles.text, style]}>
      {text}
    </Link>
  );
};

export default NavigationButton;
