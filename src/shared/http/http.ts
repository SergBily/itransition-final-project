import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import localStorageKeys from '../constants/localStorageKeys';
import { AuthResponse } from '../models/authResponse.model';
import toastConfig from '../toast/toastConfig';
import BASE_URL from '../constants/baseUrls';
import urls from '../constants/urls';

const $api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(localStorageKeys.TOKEN)}`;
  return config;
});

$api.interceptors.response.use((config) => config, async (e) => {
  const originalRequest = e.config;
  const codeError = 401;
  if (e.response?.status === codeError && e.config && !e.config.isRetry) {
    originalRequest.isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(urls.REFRESH, { withCredentials: true });
      localStorage.setItem(localStorageKeys.TOKEN, response.data.accessToken);
      return await $api.request(originalRequest);
    } catch (err) {
      toast.error('User is not unauthorized', toastConfig);
    }
  }
  throw e;
});

export default $api;
