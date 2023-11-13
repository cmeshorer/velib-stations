import {ColorValue} from 'react-native';

interface Theme {
  purple: ColorValue;
  green: ColorValue;
  orange: ColorValue;
  beige: ColorValue;
  blue: {
    regular: ColorValue;
    pale: ColorValue;
  };
  grey: {
    dark: ColorValue;
    regular: ColorValue;
    pale: ColorValue;
    white: ColorValue;
  };
  status: {
    success: ColorValue;
    error: ColorValue;
  };
}

export const theme = {
  purple: '#af7acc',
  green: '#dff7e3',
  orange: '#ffac69',
  beige: '#f7f0ed',
  blue: {
    regular: '#6573db',
    pale: '#ebf2f5',
  },
  grey: {
    dark: '#000000',
    regular: '#8f8888',
    pale: '#929596',
    white: '#ffffff',
  },
  status: {
    success: '#68965a',
    error: '#eb4034',
  },
} as Theme;
