import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getAllCollections, getLargestCollectionsApi } from '../../shared/apis/collectionApi';
import routes from '../../shared/constants/routes';
import AllCollectionsResponse from '../../shared/models/allCollections/allCollectionsResponse.model';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import AllCollection from '../../shared/models/state/allCollection.module';

const initialState: AllCollection = {
  status: 'idle',
  errorMessage: '',
  errors: [],
  mainPageCollection: null,
};

export const getAllCollection = createAsyncThunk<AllCollectionsResponse[], string>(
  routes.COLLECTIONS,
  async (userId, thunkAPI) => {
    try {
      const response = await getAllCollections(userId);
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

export const getLargestCollections = createAsyncThunk<AllCollectionsResponse[], void>(
  routes.COLLECTION_LARGEST,
  async (_, thunkAPI) => {
    try {
      const response = await getLargestCollectionsApi();
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

export const allCollectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    allCollectionReset: (state) => {
      state.status = 'idle';
      state.errorMessage = '';
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCollection.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.allCollections = payload;
      })
      .addCase(getAllCollection.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      })
      .addCase(getLargestCollections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLargestCollections.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.mainPageCollection = payload;
      })
      .addCase(getLargestCollections.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { allCollectionReset } = allCollectionsSlice.actions;
export default allCollectionsSlice.reducer;
