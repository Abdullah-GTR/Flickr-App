import {StackScreenProps} from '@react-navigation/stack';
import {SearchServiceTypes} from '../services';

export type RootStackParamList = {
  Home: undefined;
  ImageDetails: SearchServiceTypes.Photo;
};
export enum navTypes {
  Home = 'Home',
  ImageDetails = 'ImageDetails',
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
