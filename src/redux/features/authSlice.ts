import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import routes from '../../shared/constants/routes';
import AuthState from '../../shared/models/authState.model';
import { registrationApi, logoutApi, loginApi } from '../../shared/apis/authApi';
import { AuthForm, LoginForm } from '../../shared/models/authForm.model';
import { AuthResponse } from '../../shared/models/authResponse.model';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import LocalStorageData from '../../shared/models/localStorageData.model';

const initialState: AuthState = {
  status: 'idle',
  errorMessage: '',
  userId: '',
  token: '',
  name: '',
};

export const registration = createAsyncThunk<AuthResponse, AuthForm>(
  routes.SIGNUP,
  async (userData, thunkAPI) => {
    try {
      const response = await registrationApi(userData);
      const { data } = response;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message.message));
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginForm>(
  routes.LOGIN,
  async (userData, thunkAPI) => {
    try {
      const response = await loginApi(userData);
      const { data } = response;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message.message));
    }
  },
);

export const logout = createAsyncThunk<void, void>(
  routes.LOGOUT,
  async () => {
    const response = await logoutApi();
    const { data } = response;
    return data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle';
      state.errorMessage = '';
    },
    resetStateUser: (state) => {
      state.status = 'idle';
      state.errorMessage = '';
      state.userId = '';
      state.name = '';
      state.token = '';
    },
    initUserState: (state, { payload }: PayloadAction<LocalStorageData>) => {
      state.userId = payload.userId;
      state.name = payload.name;
      state.token = payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.userId = payload.user.id;
        state.name = payload.user.name;
        state.token = payload.accessToken;
      })
      .addCase(registration.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = payload as string;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.userId = payload.user.id;
        state.name = payload.user.name;
        state.token = payload.accessToken;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = payload as string;
      });
  },
});

export const { reset, resetStateUser, initUserState } = authSlice.actions;
export default authSlice.reducer;
