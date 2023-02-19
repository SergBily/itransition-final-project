import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { createNewCollection } from '../../shared/apis/collectionApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import CollectionRequest from '../../shared/models/newCollection/collectionRequest';
import CollectionResponse from '../../shared/models/newCollection/collectionResponse';
import NewCollection from '../../shared/models/state/newCollection.model';

const initialState: NewCollection = {
  status: 'idle',
  errorMessage: '',
  errors: [],
};

export const createCollection = createAsyncThunk<CollectionResponse, CollectionRequest>(
  routes.COLLECTIONCREATE,
  async (collectionData, thunkAPI) => {
    try {
      const response = await createNewCollection(collectionData);
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

export const newCollectionSlice = createSlice({
  name: 'newCollection',
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
      .addCase(createCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCollection.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.collection = payload;
      })
      .addCase(createCollection.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { reset } = newCollectionSlice.actions;
export default newCollectionSlice.reducer;
