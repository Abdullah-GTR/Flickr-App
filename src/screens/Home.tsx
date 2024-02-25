import {debounce} from 'lodash';
import {observer} from 'mobx-react';
import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Pressable,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors, Strings} from '../assets';
import {FooterSearchLoader, Search} from '../components';
import {ImageSize} from '../constant';
import {navTypes, RootStackScreenProps} from '../navigator';
import {SearchServiceTypes} from '../services';
import {updateURLParameter} from '../util';
import {ScaledSheet} from 'react-native-size-matters';
import {Store} from '../mst';

type RenderItem = {
  item: SearchServiceTypes.Photo;
};

const Home = ({navigation}: RootStackScreenProps<navTypes.Home>) => {
  const [imageData, setImageData] = useState<
    SearchServiceTypes.Photo[] | undefined
  >();
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>();
  const [totalPage, setTotalPage] = useState<number>(1);
  const [zoomedImageData, setZoomedImageData] =
    useState<SearchServiceTypes.Photo | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const canSearch = (newPage: number, passedQuery: string) => {
    return (
      passedQuery &&
      newPage <= totalPage &&
      !isLoading &&
      !errorText &&
      Store.networkStore.isConnected
    );
  };

  const search = async (load: boolean, newPage: number, searchText: string) => {
    if (canSearch(newPage, searchText)) {
      try {
        setIsLoading(true);
        const response = await Store.imageDataStore.fetchProject(
          searchText,
          newPage,
          load,
        );
        if (response.photos.photo.length) {
          if (load) {
            setImageData(response.photos.photo);
          } else {
            setImageData(imageData?.concat(response.photos.photo));
          }
          setErrorText('');
          setPage(newPage);
          setTotalPage(response.photos.pages);
        } else {
          setErrorText(Strings.NoResult);
        }
      } catch (err) {
        setErrorText(err?.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    } else if (!searchText && !isLoading) {
      setErrorText(Strings.EnterSearchText);
    } else if (!Store.networkStore.isConnected) {
      setErrorText(Strings.NoInternet);
    }
  };

  const debouncedSearch = useCallback(debounce(search, 400), []);

  const onHandleChange = (text: string) => {
    resetStates();
    setQuery(text);
    console.log(text);
    debouncedSearch(true, 1, text);
  };

  const onPressImage = (item: SearchServiceTypes.Photo) =>
    navigation.navigate('ImageDetails', item);

  const resetStates = () => {
    setPage(1);
    setTotalPage(1);
  };
  const openModal = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
    extrapolate: 'extend',
  });
  const saveModal = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const open = {
    transform: [{scale: openModal}, {translateY: saveModal}],
  };

  const renderZoomedImage = () => {
    if (zoomedImageData) {
      return (
        <Animated.View style={[styles.modal, open]}>
          <Pressable
            onPress={() => {
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
              }).start();
            }}>
            <Image
              source={{
                uri: updateURLParameter(zoomedImageData, ImageSize.large),
              }}
              style={styles.zoomedImage}
              resizeMode="contain"
            />
          </Pressable>
        </Animated.View>
      );
    } else {
      return null;
    }
  };

  const renderItem = ({item}: RenderItem) => {
    return (
      <TouchableOpacity
        style={styles.renderList}
        onLongPress={() => {
          setZoomedImageData(item);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: false,
          }).start();
        }}
        onPressOut={() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }).start();

          setZoomedImageData(null);
        }}
        onPress={() => onPressImage(item)}>
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

  const onRetry = () => {
    setErrorText('');
    const load = page > 1 ? false : true;
    const newPage = load ? 1 : page + 1;
    search(load, newPage, query);
  };

  const loadMore = () => {
    search(false, page + 1, query);
  };

  const renderFooter = () => {
    if (isLoading && page > 1) {
      return <FooterSearchLoader style={styles.footer} />;
    } else if (page > 1 && errorText) {
      return renderErrorScreen();
    } else {
      return null;
    }
  };

  const renderSearchResult = () => {
    return (
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={imageData}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    );
  };

  const renderErrorScreen = () => {
    return (
      <View style={page > 1 ? styles.footerScreenView : styles.fullScreenView}>
        <Text style={styles.errorText}>{errorText}</Text>
        {errorText !== Strings.NoResult && query ? (
          <Button title="Retry" color={Colors.buttonColor} onPress={onRetry} />
        ) : null}
      </View>
    );
  };

  const renderInputSearchComponent = () => {
    return <Search setQuery={onHandleChange} style={styles.searchComp} />;
  };

  return (
    <SafeAreaProvider style={styles.container}>
      {renderInputSearchComponent()}
      {errorText && page === 1 ? renderErrorScreen() : renderSearchResult()}
      {renderZoomedImage()}
    </SafeAreaProvider>
  );
};

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

export default observer(Home);
