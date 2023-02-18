import { RootState } from '../store';

export const selectErrorMessage = (state: RootState) => state.newCollection.errorMessage;
export const selectStatus = (state: RootState) => state.newCollection.status;
export const selectCollection = (state: RootState) => state.newCollection.collection;
