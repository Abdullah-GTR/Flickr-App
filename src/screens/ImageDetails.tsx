import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';

import {ImageHeadline} from '../components';
import {ImageSize} from '../constant';
import {navTypes, RootStackScreenProps} from '../navigator';
import {updateURLParameter} from '../util';

export default function ImageDetail({
  route,
}: RootStackScreenProps<navTypes.ImageDetails>) {
  const renderImageAndTitle = () => {
    return (
      <>
        <Image
          source={{
            uri: updateURLParameter(route.params, ImageSize.large),
          }}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        <ImageHeadline
          title={route.params.title}
          style={styles.imageHeadline}
        />
      </>
    );
  };
  return <ScrollView>{renderImageAndTitle()}</ScrollView>;
}

const styles = StyleSheet.create({
  imageStyle: {width: '100%', height: 500},
  imageHeadline: {paddingHorizontal: 10},
});
