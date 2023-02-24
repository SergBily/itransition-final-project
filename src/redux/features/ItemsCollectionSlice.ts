import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getItemsCollectionApi } from '../../shared/apis/collectionApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import ItemsCollection from '../../shared/models/items/itemsCollection';
import ItemsCollectionResponse from '../../shared/models/items/itemssCollectionResponse';

const initialState: ItemsCollection = {
  items: [],
  status: 'idle',
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

export const itemsCollectionSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsCollectionReset: (state) => {
      state.status = 'idle';
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
      });
  },
});

export const { itemsCollectionReset } = itemsCollectionSlice.actions;
export default itemsCollectionSlice.reducer;
