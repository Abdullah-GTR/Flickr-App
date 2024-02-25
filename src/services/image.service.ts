import {getData} from '../network';
import {SearchServiceTypes} from './type';

export const searchImage = (
  query: string,
  page: number,
  showLoader: boolean,
): Promise<SearchServiceTypes.SearchImageResponse> => {
  return getData(showLoader, query, page);
};
