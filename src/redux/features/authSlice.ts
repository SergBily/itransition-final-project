import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import routes from '../../shared/constants/routes';
import AuthState from '../../shared/models/authState.model';
import { registrationApi, logoutApi, loginApi } from '../../shared/apis/authApi';
import { AuthForm, LoginForm } from '../../shared/models/authForm.model';
import { AuthResponse } from '../../shared/models/authResponse';

type ErrorResponse = {
  errors: string[],
  message: string
};

const initialState: AuthState = {
  status: 'idle',
  errorMessage: '',
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
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
      })
      .addCase(registration.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = payload as string;
      });
  },
});

export const { reset, resetStateUser } = authSlice.actions;
export default authSlice.reducer;
