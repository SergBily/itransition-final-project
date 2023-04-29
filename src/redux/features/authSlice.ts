import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData } from '../../shared/models';
import setUserData from '../../shared/utils/setUserData';
import { sliceNames } from '../../shared/constants';

const initialState: AuthData = {
  userId: '',
  token: '',
  name: '',
  role: '',
};

export const authSlice = createSlice({
  name: sliceNames.AUTH,
  initialState,
  reducers: {
    resetStateUser: (state) => {
      state.userId = '';
      state.name = '';
      state.token = '';
      state.role = '';
    },
    initStateUser: (state, { payload }: PayloadAction<AuthData>) => {
      state.userId = payload.userId;
      state.name = payload.name;
      state.token = payload.token;
      state.role = payload.role;
      setUserData(payload);
    },
  },
});

export const { resetStateUser, initStateUser } = authSlice.actions;
export default authSlice.reducer;
