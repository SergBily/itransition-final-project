import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import collectionsReducer from './features/allCollectionSlice';
import newCollectionReducer from './features/newCollectionSlice';
import itemsReducer from './features/ItemsCollectionSlice';
import itemReducer from './features/itemSlice';
import itemPageReducer from './features/itemPageSlice';
import editCollectionReducer from './features/editCollectionSlice';
import collectionReducer from './features/collectionSlice';
import adminReducer from './features/adminSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    collections: collectionsReducer,
    newCollection: newCollectionReducer,
    items: itemsReducer,
    item: itemReducer,
    itemPage: itemPageReducer,
    editCollection: editCollectionReducer,
    collection: collectionReducer,
    admin: adminReducer,
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
