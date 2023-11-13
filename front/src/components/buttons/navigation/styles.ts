import {StyleSheet} from 'react-native';
import {theme} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  text: {
    fontWeight: '600',
    color: theme.blue.regular,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default styles;
