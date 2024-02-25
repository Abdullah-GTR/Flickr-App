import {types} from 'mobx-state-tree';

export const LoaderStore = types
  .model({
    load: types.boolean,
  })
  .actions(self => ({
    ChangeStatus(status: boolean) {
      self.load = status;
    },
  }));
