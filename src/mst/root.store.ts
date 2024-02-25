import {types} from 'mobx-state-tree';
import {ImageDataStore} from './image.store';
import {LoaderStore} from './loader.store';
import {NetworkStore} from './network.store';

const RootStore = types.model({
  networkStore: types.optional(NetworkStore, {isConnected: true}),
  imageDataStore: types.optional(ImageDataStore, {totalPages: 0}),
  loaderStore: types.optional(LoaderStore, {load: false}),
});

export const Store = RootStore.create({});
