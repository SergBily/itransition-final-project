import { RootState } from '../store';

export const selectErrorMessage = (state: RootState) => state.auth.errorMessage;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectUser = (state: RootState) => state.auth;
