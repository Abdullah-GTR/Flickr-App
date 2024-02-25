import {observer} from 'mobx-react';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {Colors} from '../assets';
import {Store} from '../mst';

export const FullScreenLoader = observer(() => {
  return (
    <>
      {Store.loaderStore.load && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" animating={true} />
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
