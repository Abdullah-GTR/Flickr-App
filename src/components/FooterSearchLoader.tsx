import {View, ViewStyle, ActivityIndicator, StyleProp} from 'react-native';
import React from 'react';

export const FooterSearchLoader = ({style}: {style: StyleProp<ViewStyle>}) => {
  return (
    <View style={style}>
      <ActivityIndicator />
    </View>
  );
};
