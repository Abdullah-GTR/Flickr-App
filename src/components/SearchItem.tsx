import {Animated, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {updateURLParameter} from '../util';
import {ImageSize} from '../constant';

const SearchItem = () => {
  return (
    <TouchableOpacity
      style={styles.renderList}
      onLongPress={() => {
        setNewItem(item);
      }}
      delayLongPress={3000}
      onPressOut={() => {
        setNewItem(null);
        console.log('Touch  release', setNewItem);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }}
      onPress={() => onPressImage(item)}>
      {/* <View {...panResponder.panHandlers}> */}
      <Image
        source={{
          uri: updateURLParameter(item, ImageSize.medium),
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text numberOfLines={1} style={styles.imageTitle}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchItem;

const styles = ScaledSheet.create({
  container: {flex: 1, width: '100%'},
  list: {width: '100%'},
  image: {
    width: '100%',
    height: 200,
  },
  zoomedImage: {
    width: '100%',
    height: '80%',
  },
  overlay: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  imageTitle: {
    fontWeight: '400',
    fontSize: '12@s',
    height: 32,
    alignSelf: 'center',
    paddingTop: 15,
    color: Colors.black,
  },
  renderList: {
    width: '33.3%',
    paddingHorizontal: 3,
    marginBottom: 20,
  },
  errorText: {
    color: Colors.red,
  },
  fullScreenView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerScreenView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50@s',
  },
  searchComp: {
    paddingHorizontal: '15@s',
    marginTop: '23@s',
    marginBottom: '12@s',
  },
  footer: {height: '15@s', marginVertical: 28},
  footerText: {alignSelf: 'center', height: 60},
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.06)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
