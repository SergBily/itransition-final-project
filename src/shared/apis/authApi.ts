import { AppApi } from '../../redux';
import { urls } from '../constants';
import { transformAuthData } from '../utils';
import {
  AuthData, AuthForm, AuthResponse, ErrorResponse, LoginForm,
} from '../models';

export const authEndpointsApi = AppApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<AuthData, AuthForm>({
      query: (data) => ({
        url: urls.REGISTRATION,
        method: 'post',
        data,
      }),
      transformResponse: (r: AuthResponse) => (transformAuthData(r)),
      transformErrorResponse: (e: ErrorResponse) => ({
        message: e.data.message,
      }),
    }),
    login: build.mutation<AuthData, LoginForm>({
      query: (data) => ({
        url: urls.LOGIN,
        method: 'post',
        data,
      }),
      transformResponse: (r: AuthResponse) => (transformAuthData(r)),
      transformErrorResponse: (e: ErrorResponse) => ({
        message: e.data.message,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: urls.LOGOUT,
        method: 'post',
      }),
      transformErrorResponse: (e: ErrorResponse) => ({
        message: e.data.message,
      }),
    }),
  }),
});

const { useLoginMutation, useLogoutMutation, useRegistrationMutation } = authEndpointsApi;
export default { useLoginMutation, useLogoutMutation, useRegistrationMutation };
