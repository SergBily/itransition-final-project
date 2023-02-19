import { RootState } from '../store';

export const selectErrorMessage = (state: RootState) => state.collection.errorMessage;
export const selectStatus = (state: RootState) => state.collection.status;
export const selectErrors = (state: RootState) => state.collection.errors;
export const selectAllCollections = (state: RootState) => state.collection.allCollection;
