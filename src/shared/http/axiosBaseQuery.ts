import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import $api from './http';
import { HttpMethods } from '../models';

const axiosBaseQuery = (baseUrl: string = '/'): BaseQueryFn<
{
  url: string
  method: HttpMethods
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
},
unknown,
unknown
> => async ({
  url, method, data, params,
}) => {
  try {
    const result = await $api[`${method}`](`${baseUrl}${url}`, data, params);
    return { data: result.data };
  } catch (axiosError) {
    const error = axiosError as AxiosError;
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message,
      },
    };
  }
};

export default axiosBaseQuery;
