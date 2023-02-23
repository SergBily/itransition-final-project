import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import createNewItem from '../../shared/apis/itemApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import ItemStructure from '../../shared/models/items/itemStructure';
import NewItemRequest from '../../shared/models/items/newItemResponse';
import ItemState from '../../shared/models/state/itemState';

const initialState: ItemState = {
  status: 'idle',
  errorMessage: '',
  errors: [],
  item: null,
};

export const createItem = createAsyncThunk<ItemStructure, NewItemRequest>(
  routes.ITEM_CREATE,
  async (payload, thunkAPI) => {
    try {
      const response = await createNewItem(payload);
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

export const itemSlice = createSlice({
  name: 'newItem',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle';
      state.errorMessage = '';
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createItem.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.item = payload.item;
      })
      .addCase(createItem.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
