import { AxiosResponse } from 'axios';
import { AppApi } from '../../redux';
import { urls } from '../constants';
import $api from '../http/http';
import {
  AuthData, AuthForm, AuthResponse, ErrorResponse, LoginForm,
} from '../models';

export const registrationApi = ((payload: AuthForm): Promise<AxiosResponse<AuthResponse>> => $api.post(
  urls.REGISTRATION,
  payload,
));

// export const loginApi = ((payload: LoginForm): Promise<AxiosResponse<AuthResponse>> => $api.post(
//   urls.LOGIN,
//   payload,
// ));

export const logoutApi = (): Promise<AxiosResponse> => $api.post(urls.LOGOUT);

export const authEndpointsApi = AppApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthData, LoginForm>({
      query: (data) => ({
        url: urls.LOGIN,
        method: 'post',
        data,
      }),
      transformResponse: (r: AuthResponse) => ({
        token: r.accessToken,
        name: r.user.name,
        userId: r.user.id,
        role: r.user.role,
      }),
      transformErrorResponse: (e: ErrorResponse) => ({
        message: e.data.message,
      }),
    }),
  }),
});

const { useLoginMutation } = authEndpointsApi;
export default { useLoginMutation };
