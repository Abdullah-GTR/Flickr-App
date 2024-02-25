import {ImageFormat, ImageUrl} from '../constant';
import {SearchServiceTypes} from '../services';

export const updateURLParameter = (
  item: SearchServiceTypes.Photo,
  size: string,
) => {
  return (
    ImageUrl +
    item.server +
    '/' +
    item.id +
    '_' +
    item.secret +
    size +
    ImageFormat
  );
};
