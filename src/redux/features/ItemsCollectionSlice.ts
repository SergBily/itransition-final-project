import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getItemsCollectionApi } from '../../shared/apis/collectionApi';
import { deleteItemsApi, getItemApi } from '../../shared/apis/itemApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import ItemsCollection from '../../shared/models/items/itemsCollection.model';
import ItemsCollectionResponse from '../../shared/models/items/itemssCollectionResponse.model';
import ItemStructure from '../../shared/models/items/itemStructure.model';

const initialState: ItemsCollection = {
  items: [],
  status: 'idle',
  delStatus: 'idle',
  getStatus: 'idle',
  errorMessage: '',
  errors: [],
  collection: null,
  item: null,
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

export const getItem = createAsyncThunk<ItemStructure, string>(
  routes.ITEM,
  async (itemId, thunkAPI) => {
    try {
      const response = await getItemApi(itemId);
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

export const itemsCollectionSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsCollectionReset: (state) => {
      state.status = 'idle';
      state.delStatus = 'idle';
      state.errorMessage = '';
      state.errors = [];
      state.getStatus = 'idle';
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
      })
      .addCase(getItem.pending, (state) => {
        state.getStatus = 'loading';
      })
      .addCase(getItem.fulfilled, (state, { payload }) => {
        state.getStatus = 'success';
        state.item = payload;
      })
      .addCase(getItem.rejected, (state, { payload }) => {
        state.getStatus = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { itemsCollectionReset } = itemsCollectionSlice.actions;
export default itemsCollectionSlice.reducer;
