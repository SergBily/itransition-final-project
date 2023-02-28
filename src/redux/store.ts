import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import collectionsReducer from './features/allCollectionSlice';
import newCollectionReducer from './features/newCollectionSlice';
import itemsReducer from './features/ItemsCollectionSlice';
import newItemReducer from './features/itemSlice';
import itemPageReducer from './features/itemPageSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    collections: collectionsReducer,
    newCollection: newCollectionReducer,
    items: itemsReducer,
    newItem: newItemReducer,
    itemPage: itemPageReducer,
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
