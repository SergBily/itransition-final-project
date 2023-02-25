import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getItemsCollectionApi } from '../../shared/apis/collectionApi';
import { deleteItemsApi } from '../../shared/apis/itemApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import ItemsCollection from '../../shared/models/items/itemsCollection.model';
import ItemsCollectionResponse from '../../shared/models/items/itemssCollectionResponse.model';

const initialState: ItemsCollection = {
  items: [],
  status: 'idle',
  delStatus: 'idle',
  errorMessage: '',
  errors: [],
  collection: null,
};

export const getItemsCollection = createAsyncThunk<ItemsCollectionResponse, string>(
  routes.COLLECTION_ID,
  async (id, thunkAPI) => {
    try {
      const response = await getItemsCollectionApi(id);
      const { data } = response;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message as ErrorResponse));
    }
  },
);

export const deleteItems = createAsyncThunk<void, string[]>(
  routes.ITEM_DELETE,
  (items, thunkAPI) => {
    try {
      deleteItemsApi(items);
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message as ErrorResponse));
    }
  },
);

export const itemsCollectionSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsCollectionReset: (state) => {
      state.status = 'idle';
      state.delStatus = 'idle';
      state.errorMessage = '';
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemsCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItemsCollection.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.items = payload.items;
        state.collection = payload.collection;
      })
      .addCase(getItemsCollection.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      })
      .addCase(deleteItems.pending, (state) => {
        state.delStatus = 'loading';
      })
      .addCase(deleteItems.fulfilled, (state) => {
        state.delStatus = 'success';
      })
      .addCase(deleteItems.rejected, (state, { payload }) => {
        state.delStatus = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { itemsCollectionReset } = itemsCollectionSlice.actions;
export default itemsCollectionSlice.reducer;
