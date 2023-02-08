import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import routes from '../../shared/constants/routes';
import AuthState from '../../shared/models/authState.model';
import { registrationApi } from '../../shared/apis/authApi';
import AuthForm from '../../shared/models/authForm.model';
import { AuthResponse } from '../../shared/models/authResponse';

const initialState: AuthState = {
  status: 'idle',
  errorMessage: '',
};

export const registration = createAsyncThunk<AuthResponse, AuthForm>(
  routes.SIGNUP,
  async (userData, thunkAPI) => {
    try {
      console.log(userData, 'in');
      const response = await registrationApi(userData);
      const { data } = response;
      console.log(data);
      return data;
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
      return thunkAPI.rejectWithValue((error.message));
    }
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
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
