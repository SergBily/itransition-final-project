import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AppApi } from './services/appApi';
import collectionsReducer from './features/allCollectionSlice';
import newCollectionReducer from './features/newCollectionSlice';
import itemsReducer from './features/ItemsCollectionSlice';
import itemReducer from './features/itemSlice';
import itemPageReducer from './features/itemPageSlice';
import editCollectionReducer from './features/editCollectionSlice';
import collectionReducer from './features/collectionSlice';
import adminReducer from './features/adminSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [AppApi.reducerPath]: AppApi.reducer,
    collections: collectionsReducer,
    newCollection: newCollectionReducer,
    items: itemsReducer,
    item: itemReducer,
    itemPage: itemPageReducer,
    editCollection: editCollectionReducer,
    collection: collectionReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AppApi.middleware),
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
