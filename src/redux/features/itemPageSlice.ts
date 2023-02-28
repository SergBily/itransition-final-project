import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getItemDataApi } from '../../shared/apis/itemApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import ItemPageRequest from '../../shared/models/itemPage/ItemPageRequest.model';
import ItemPageResponse from '../../shared/models/itemPage/itemPageResponse.model';
import ItemPageState from '../../shared/models/itemPage/ItemPageState.model';

const initialState: ItemPageState = {
  status: 'idle',
  errorMessage: '',
  errors: [],
  item: null,
  collection: null,
  comments: [],
};

export const getItemData = createAsyncThunk<ItemPageResponse, ItemPageRequest>(
  routes.ITEM_PAGE,
  async (payload, thunkAPI) => {
    try {
      return await getItemDataApi(payload);
    } catch (e) {
      const error = e as AxiosError;
      const message = (error.response && error.response.data) as ErrorResponse
        || error.message || error.toString();
      return thunkAPI.rejectWithValue((message as ErrorResponse));
    }
  },
);

export const itemPageSlice = createSlice({
  name: 'itemPage',
  initialState,
  reducers: {
    itemPageReset: (state) => {
      state.status = 'idle';
      state.errorMessage = '';
      state.errors = [];
    },
    newComment: (state, { payload }) => {
      state.comments = [...state.comments, payload];
    },
    like: (state, { payload }) => {
      state.item = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItemData.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.collection = payload.collection;
        state.item = payload.item;
        state.comments = payload.comments;
      })
      .addCase(getItemData.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { itemPageReset, newComment, like } = itemPageSlice.actions;
export default itemPageSlice.reducer;
