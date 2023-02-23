import { RootState } from '../store';

export const selectErrorMessage = (state: RootState) => state.collections.errorMessage;
export const selectStatus = (state: RootState) => state.collections.status;
export const selectErrors = (state: RootState) => state.collections.errors;
export const selectAllCollections = (state: RootState) => state.collections.allCollection;
