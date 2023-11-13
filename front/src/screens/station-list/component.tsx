import axios, {AxiosError} from 'axios';
import React from 'react';
import {GiCancel} from 'react-icons/gi';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from 'react-query';

import ActionButton from '../../components/buttons/action';
import NavigationButton from '../../components/buttons/navigation';
import BikeIllustration from '../../components/illustrations/bike';
import Input from '../../components/input';
import Loader from '../../components/loader';
import Page from '../../components/page';
import ErrorText from '../../components/texts/error';
import TitleText from '../../components/texts/title';
import {isSmallDevice} from '../../constants';
import {useAuthStore} from '../../store';
import {theme} from '../../theme';
import styles from './styles';
import {
  BikeType,
  Station,
  StationListScreenProps,
  Stations,
  StationsBackend,
} from './types';

const StationListScreen = (props: StationListScreenProps) => {
  const [page, setPage] = React.useState(1);
  const [stations, setStations] = React.useState<Stations>([]);
  const [isEndReached, setIsEndReached] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [type, setType] = React.useState<BikeType>(BikeType.ANY);
  const [isFetchingNextPage, setIsFetchingNextPage] = React.useState(false);

  const setToken = useAuthStore(state => state.storeToken);

  const isFiltering = type !== BikeType.ANY || search;
  const isStationsEmpty = stations.length === 0;
  const numColumns = isSmallDevice ? 1 : 3;
  const onEndReachedThreshold = 0.1;

  const isTokenExpired = (error: AxiosError) => {
    const status = (error as AxiosError).response?.status;
    return status === 401;
  };

  const onRemoveToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const onLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios('http://localhost:3000/logout', {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
      });
      onRemoveToken();
    } catch (error) {
      const expiredToken = isTokenExpired(error as AxiosError);
      if (expiredToken) {
        onRemoveToken();
      } else {
        console.error(error);
      }
    }
  };

  const searchFilteredBikeStations = stations?.filter(bikeStation =>
    bikeStation?.name?.toLowerCase().includes(search),
  );

  const displayedBikeStations =
    type === BikeType.ANY
      ? searchFilteredBikeStations
      : searchFilteredBikeStations?.filter(bikeStation => {
          const bikesAvailableByType = bikeStation?.numBikesAvailableTypes;
          const numberBikesAvailableBySelectedType =
            bikesAvailableByType?.[type];
          return (
            numberBikesAvailableBySelectedType &&
            numberBikesAvailableBySelectedType > 0
          );
        });

  const stationListAdapter: (
    stationList: StationsBackend,
  ) => Stations = stationList => {
    let adaptedStations = [] as Stations;
    if (!stationList) {
      return adaptedStations;
    }
    adaptedStations = stationList.map(station => ({
      name: station.name,
      numBikesAvailable: station.numBikesAvailable,
      numBikesAvailableTypes: {
        mechanical: station.num_bikes_available_types?.[0].mechanical,
        ebike: station.num_bikes_available_types?.[1].ebike,
      },
    }));

    return adaptedStations;
  };

  const getBikeStations = async (refetch: boolean, pageNumber: number) => {
    try {
      if (!refetch) {
        setIsFetchingNextPage(true);
      }
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:3000/stations?page=${pageNumber}&single=${
          refetch ? 'false' : 'true'
        }`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const stationsBackend: StationsBackend = res.data.data;
      const stationsData = stationListAdapter(stationsBackend);
      const updatedStations = refetch
        ? stationsData
        : [...stations, ...stationsData];
      setStations(updatedStations);
      setPage(pageNumber);
      if (stationsData.length === 0) {
        setIsEndReached(true);
      }
    } catch (error) {
      const expiredToken = isTokenExpired(error as AxiosError);
      if (expiredToken) {
        onRemoveToken();
      } else {
        console.error(error);
      }
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  const {isLoading, isRefetching, isError} = useQuery(
    ['bikeStations', page],
    () => getBikeStations(true, page),
    {
      refetchInterval: 120000, // 2 minutes
    },
  );

  const onEndReached = () => {
    if (!isEndReached && !isFetchingNextPage && !isFiltering) {
      getBikeStations(false, page + 1);
    }
  };

  const onSearch = (text: string) => {
    setSearch(text);
  };

  const onClearSearch = () => {
    setSearch('');
  };

  const onSetBikeType = (bikeType: BikeType) => {
    setType(bikeType);
  };

  const Item = ({item, index}: {item: Station; index: number}) => {
    const numberBikesAvailable = item.numBikesAvailable;
    const numberMechanicalBikesAvailable =
      item.numBikesAvailableTypes?.mechanical;
    const numberEbikesAvailable = item.numBikesAvailableTypes?.ebike;
    const bikesAvailabilityColor = (bikesAvailable?: number) => ({
      color: bikesAvailable === 0 ? theme.grey.pale : undefined,
    });

    return (
      <View key={index} style={styles.stationItem}>
        <Text numberOfLines={1} style={styles.stationName}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={bikesAvailabilityColor(
            numberBikesAvailable,
          )}>{`Vélos disponibles : ${numberBikesAvailable}`}</Text>
        <Text
          numberOfLines={1}
          style={bikesAvailabilityColor(numberMechanicalBikesAvailable)}>
          {`Manuels : ${numberMechanicalBikesAvailable}`}
        </Text>
        <Text
          numberOfLines={1}
          style={bikesAvailabilityColor(numberEbikesAvailable)}>
          {`Électriques : ${numberEbikesAvailable}`}
        </Text>
      </View>
    );
  };

  const ItemSeparator = () => <View style={styles.itemSeparator} />;

  const EmptyComponent = () => (
    <View style={styles.emptyComponentContainer}>
      {isLoading && isStationsEmpty ? (
        <Loader size={50} color={theme.orange} />
      ) : (
        <>
          <Text style={styles.noResults} numberOfLines={1}>
            Aucun résultat
          </Text>
          <BikeIllustration />
        </>
      )}
    </View>
  );

  const FooterComponent = () =>
    isFiltering || isError ? null : isFetchingNextPage ? (
      <Loader style={styles.nextPageIndicator} />
    ) : isEndReached ? (
      <Text style={styles.endReached}>
        Il n'y a plus de stations à charger ✅
      </Text>
    ) : null;

  return (
    <Page>
      <NavigationButton text="Se déconnecter" onPress={onLogout} />
      <View style={styles.subContainer}>
        <TitleText style={styles.title} text="Stations Vélib'" />
        <View style={styles.refetchContainer}>
          {isRefetching ? <Loader /> : isError ? <ErrorText /> : null}
        </View>
        <View style={styles.searchContainer}>
          <Input
            style={styles.input}
            placeholder="Rechercher..."
            onChangeText={text => onSearch(text)}
            value={search}
          />
          {search ? (
            <TouchableOpacity
              style={styles.clearContainer}
              onPress={onClearSearch}>
              <GiCancel size={22} color={theme.grey.regular as string} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.buttonsContainer}>
          <ActionButton
            title="Tous"
            onPress={() => onSetBikeType(BikeType.ANY)}
            disabled={type === BikeType.ANY}
          />
          <ActionButton
            title="Manuel"
            onPress={() => onSetBikeType(BikeType.MECHANICAL)}
            disabled={type === BikeType.MECHANICAL}
          />
          <ActionButton
            title="Électrique"
            onPress={() => onSetBikeType(BikeType.EBIKE)}
            disabled={type === BikeType.EBIKE}
          />
        </View>
        <FlatList
          data={displayedBikeStations}
          renderItem={Item}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={EmptyComponent}
          ListFooterComponent={FooterComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContentContainer}
        />
      </View>
    </Page>
  );
};

export default StationListScreen;
