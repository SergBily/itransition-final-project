import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import {
  blockAndUnblockUsersApi, changeRoleApi, deleteUsersApi, getAllUsersApi,
} from '../../shared/apis/admin';
import AdminState from '../../shared/models/state/adminState';
import User from '../../shared/models/admin/userAdmin.model';
import UserActionRequest from '../../shared/models/admin/blockRequest.model';

const initialState: AdminState = {
  status: 'idle',
  actionStatus: 'idle',
  errorMessage: '',
  errors: [],
  users: [],
  action: 'idle',
};

export const getAllUsers = createAsyncThunk<User[], void>(
  routes.ADMIN,
  async (_, thunkAPI) => {
    try {
      const response = await getAllUsersApi();
      const { data } = response;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message as ErrorResponse));
    }
  },
);

export const deleteUsers = createAsyncThunk<void, string[]>(
  routes.USER_DELETE,
  async (usersId, thunkAPI) => {
    try {
      deleteUsersApi(usersId);
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message as ErrorResponse));
    }
  },
);

export const changeStatusUsers = createAsyncThunk<void, UserActionRequest>(
  routes.USER_STATUS,
  async (payload, thunkAPI) => {
    try {
      blockAndUnblockUsersApi(payload);
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message as ErrorResponse));
    }
  },
);

export const changeRoleUsers = createAsyncThunk<void, UserActionRequest>(
  routes.USER_ROLE,
  async (payload, thunkAPI) => {
    try {
      changeRoleApi(payload);
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message as ErrorResponse));
    }
  },
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminReset: (state) => {
      state.status = 'idle';
      state.action = 'idle';
      state.actionStatus = 'idle';
      state.errorMessage = '';
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.actionStatus = 'loading';
      })
      .addCase(deleteUsers.fulfilled, (state) => {
        state.actionStatus = 'success';
        state.action = 'deleted';
      })
      .addCase(deleteUsers.rejected, (state, { payload }) => {
        state.actionStatus = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      })
      .addCase(changeStatusUsers.pending, (state) => {
        state.actionStatus = 'loading';
      })
      .addCase(changeStatusUsers.fulfilled, (state) => {
        state.actionStatus = 'success';
        state.action = 'changed';
      })
      .addCase(changeStatusUsers.rejected, (state, { payload }) => {
        state.actionStatus = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      })
      .addCase(changeRoleUsers.pending, (state) => {
        state.actionStatus = 'loading';
      })
      .addCase(changeRoleUsers.fulfilled, (state) => {
        state.actionStatus = 'success';
        state.action = 'changed';
      })
      .addCase(changeRoleUsers.rejected, (state, { payload }) => {
        state.actionStatus = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { adminReset } = adminSlice.actions;
export default adminSlice.reducer;
