import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/signup';
import StationListScreen from '../screens/station-list';
import {useAuthStore} from '../store';
import {SCREENS} from './screens';
import {navigationRef} from './utils';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const AppStack = () => {
  const storedToken = localStorage.getItem('token');
  const setToken = useAuthStore(state => state.storeToken);
  if (storedToken) {
    setToken(storedToken);
  }
  const token = useAuthStore(state => state.token);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {token ? (
        <Stack.Screen
          name={SCREENS.STATIONLIST}
          component={StationListScreen}
        />
      ) : (
        <>
          <Stack.Screen name={SCREENS.SIGNUP} component={SignupScreen} />
          <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const linking = {
  prefixes: [],
  config: {
    screens: {
      [SCREENS.SIGNUP]: 'signup',
      [SCREENS.LOGIN]: 'login',
      [SCREENS.STATIONLIST]: 'stationList',
    },
  },
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef} linking={linking} {...props}>
        <AppStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
