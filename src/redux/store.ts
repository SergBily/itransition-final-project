import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import collectionsReducer from './features/allCollectionSlice';
import newCollectionReducer from './features/newCollectionSlice';
import itemsReducer from './features/ItemsCollectionSlice';
import newItemReducer from './features/itemSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    collections: collectionsReducer,
    newCollection: newCollectionReducer,
    itemsCollection: itemsReducer,
    newItem: newItemReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
