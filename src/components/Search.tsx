import React from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {Strings} from '../assets';
import {Colors} from '../assets/colors';

type SearchProp = {
  setQuery: (arg1: string) => void;
  // search: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Search = (props: SearchProp) => (
  <View style={[props.style]}>
    <TextInput
      placeholder={Strings.PlaceholderText}
      style={styles.searchBox}
      placeholderTextColor={Colors.black}
      onChangeText={value => {
        props.setQuery(value);
      }}
    />
  </View>
);

const styles = ScaledSheet.create({
  searchBox: {
    borderBottomWidth: 1,
    marginBottom: 12,
    height: 40,
  },
});
