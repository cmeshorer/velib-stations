import {ViewStyle} from 'react-native';

export interface NavigationButtonProps {
  text: string;
  navigateTo?: string;
  onPress?: () => void;
  style?: ViewStyle;
}
