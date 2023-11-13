import React from 'react';
import {GiDutchBike} from 'react-icons/gi';
import {theme} from '../../../theme';
import {BikeIllustrationProps} from './types';

const BikeIllustration = (props: BikeIllustrationProps) => {
  return <GiDutchBike size={88} color={theme.orange as string} />;
};

export default BikeIllustration;
