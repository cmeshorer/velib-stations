import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {PageProps} from './types';

const Page = ({children}: PageProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default Page;
