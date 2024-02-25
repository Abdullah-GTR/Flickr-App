import axios from 'axios';
import {Strings} from '../assets';
import {FlickrBaseUrl, SearchImageUrl} from '../constant';
import {Store} from '../mst';
import {CustomError} from './type';

//constants

export const api_key = '37854f706900d0de33632598d838094a';
export const format = 'json';
export const noJsoncallback = '1';

const axiosInstance = axios.create({
  baseURL: FlickrBaseUrl,
  timeout: 3000,
});
axiosInstance.interceptors.request.use(
  function (req) {
    req.params = {
      ...req.params,
      api_key: api_key,
      format: format,
      nojsoncallback: noJsoncallback,
    };

    return req;
  },
  function (error) {
    if (error.request) {
      return Promise.reject(error.request);
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    Store.loaderStore.ChangeStatus(false);
    if (response.data.stat === 'fail') {
      let customError: CustomError = {
        status: 901,
        message: response.data.message ?? Strings.GenericError,
      };
      return Promise.reject(customError);
    } else {
      console.log(response.data);
      return response.data;
    }
  },
  function (error) {
    Store.loaderStore.ChangeStatus(false);
    let customError: CustomError;
    if (error.response) {
      customError = {
        status: error.response.status,
        message: error.response.data?.message ?? Strings.GenericError,
      };
    } else {
      customError = {
        status: error.code,
        message: error.message ?? Strings.GenericError,
      };
    }
    return Promise.reject(customError);
  },
);
export const getData = (
  showLoader: boolean,
  query: string,
  page: number,
): Promise<any> => {
  Store.loaderStore.ChangeStatus(showLoader);
  return axiosInstance
    .get(SearchImageUrl, {
      params: {tags: query, page: page},
    })
    .finally(() => {
      Store.loaderStore.ChangeStatus(false);
    });
};
