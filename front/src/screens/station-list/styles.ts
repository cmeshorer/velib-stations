import {StyleSheet} from 'react-native';
import {isSmallDevice} from '../../constants';
import {theme} from '../../theme';

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  clearContainer: {
    position: 'absolute',
    right: 5,
  },
  emptyComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endReached: {
    marginTop: 10,
    alignSelf: 'center',
    color: theme.status.success,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  flatListContentContainer: {
    backgroundColor: theme.grey.white,
    padding: 10,
    flexGrow: 1,
  },
  input: {
    paddingRight: 30,
  },
  itemSeparator: {
    height: 10,
  },
  nextPageIndicator: {
    marginTop: 10,
  },
  noResults: {
    fontSize: 18,
    color: theme.orange,
  },
  refetchContainer: {
    height: 20,
  },
  title: {
    marginBottom: undefined,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  stationItem: {
    backgroundColor: theme.blue.pale,
    padding: 5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowColor: theme.grey.dark,
    shadowOpacity: 0.15,
    elevation: 4,
    width: isSmallDevice ? '100%' : '33.33%',
  },
  stationName: {
    fontWeight: '500',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default styles;
