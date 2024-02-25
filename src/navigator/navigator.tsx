import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';
import {Images} from '../assets';

import Home from '../screens/Home';
import ImageDetail from '../screens/ImageDetails';
import {RootStackParamList} from './types';

function Logo() {
  return (
    <Image
      style={styles.LogoTitle}
      resizeMode="contain"
      source={Images.HeaderLogo}
    />
  );
}

const Navigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: () => <Logo />,
            headerTitleAlign: 'center',
          }}
          component={Home}
        />
        <Stack.Screen name="ImageDetails" component={ImageDetail} />
      </Stack.Navigator>
    </>
  );
};

export {Navigator};

const styles = StyleSheet.create({
  LogoTitle: {width: 150, height: 35},
});
