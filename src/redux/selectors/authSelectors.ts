import { authEndpointsApi } from '../../shared/apis';
import { RootState } from '../store';

export const selectUser = (state: RootState) => state.auth;
export const selectAuth = authEndpointsApi.endpoints.login.select('Auth');
