import {types} from 'mobx-state-tree';

export const NetworkStore = types
  .model({
    isConnected: types.boolean,
  })
  .actions(self => ({
    ChangeNetworkStatus(status: boolean) {
      self.isConnected = status;
    },
  }));
