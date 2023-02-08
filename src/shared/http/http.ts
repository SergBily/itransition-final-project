import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constants/urls';

const $api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default $api;
