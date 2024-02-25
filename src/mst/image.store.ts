import {types, onSnapshot, flow, cast} from 'mobx-state-tree';
import {searchImage} from '../services';

const imageData = types.model('imageData', {
  farm: types.number,
  id: types.string,
  isfamily: types.number,
  isfriend: types.number,
  ispublic: types.number,
  owner: types.string,
  secret: types.string,
  server: types.string,
  title: types.string,
});

export const ImageDataStore = types
  .model({
    images: types.array(imageData),
    totalPages: types.number || types.undefined,
  })
  .actions(self => ({
    fetchProject: flow(function* fetchProject(searchText, newPage, load) {
      try {
        var response = yield searchImage(searchText, newPage, load);
        self.totalPages = response?.photos?.pages;
        if (self.images.length) {
          self.images.concat(response.photos.photo);
          return response;
        } else {
          self.images = cast(response.photos.photo);
          return response;
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
        return error;
      }
    }),
    afterCreate() {
      //   onSnapshot(self, snapshot => console.log('Snapshot', snapshot));
    },
  }))
  .views(self => {
    return {
      findImageById(id: string) {
        return self.images.filter(t => t.id === id);
      },
    };
  });
