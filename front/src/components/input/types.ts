import {ViewStyle} from 'react-native';

export interface InputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  value: string;
  isPassword?: boolean;
  style?: ViewStyle;
}
