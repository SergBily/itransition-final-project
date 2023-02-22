import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import collectionReducer from './features/allCollectionSlice';
import newCollectionReducer from './features/newCollectionSlice';
import itemsReducer from './features/ItemsCollectionSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    collection: collectionReducer,
    newCollection: newCollectionReducer,
    itemsCollection: itemsReducer,
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
