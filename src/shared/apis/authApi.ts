import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import AuthForm from '../models/authForm.model';
import { AuthResponse } from '../models/authResponse';

export const registrationApi = ((payload: AuthForm): Promise<AxiosResponse<AuthResponse>> => $api.post(
  urls.REGISTRATION,
  payload,
));

export const logoutApi = (): Promise<AxiosResponse> => $api.post(urls.LOGOUT);
