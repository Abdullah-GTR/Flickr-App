import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import {FullScreenLoader} from './src/components';
import {Navigator} from './src/navigator';
import {Store} from './src/mst';

// TODO: to UPdate the app
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    NetInfo.addEventListener(state => {
      state.isConnected
        ? Store.networkStore.ChangeNetworkStatus(state.isConnected)
        : Store.networkStore.ChangeNetworkStatus(false);
    });
  }, []);

  return (
    <NavigationContainer>
      <Navigator />
      <FullScreenLoader />
    </NavigationContainer>
  );
};

export default observer(App);
