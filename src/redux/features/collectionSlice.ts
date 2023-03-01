import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getCollectionApi } from '../../shared/apis/collectionApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import CollectionResponse from '../../shared/models/newCollection/collectionResponse.model';
import NewCollection from '../../shared/models/state/newCollection.model';

const initialState: NewCollection = {
  status: 'idle',
  errorMessage: '',
  errors: [],
};

export const getCollection = createAsyncThunk<CollectionResponse, string>(
  routes.COLLECTION_ID,
  async (id, thunkAPI) => {
    try {
      const response = await getCollectionApi(id);
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

export const getCollectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    collectionReset: (state) => {
      state.status = 'idle';
      state.errorMessage = '';
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCollection.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.collection = payload;
      })
      .addCase(getCollection.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { collectionReset } = getCollectionSlice.actions;
export default getCollectionSlice.reducer;
