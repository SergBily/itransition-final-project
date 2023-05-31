import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { editCollectionApi } from '../../shared/apis/homeApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import CollectionResponse from '../../shared/models/newCollection/collectionResponse.model';
import EditCollectionRequest from '../../shared/models/allCollections/editCollectionRequest';
import EditCollection from '../../shared/models/editCollection.model';

const initialState: EditCollection = {
  editStatus: 'idle',
  errorMessage: '',
  errors: [],
};

export const editCollection = createAsyncThunk<CollectionResponse, EditCollectionRequest>(
  routes.COLLECTION_EDIT,
  async (collectionData, thunkAPI) => {
    try {
      const response = await editCollectionApi(collectionData);
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

export const editCollectionSlice = createSlice({
  name: 'editCollection',
  initialState,
  reducers: {
    editReset: (state) => {
      state.editStatus = 'idle';
      state.errorMessage = '';
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editCollection.pending, (state) => {
        state.editStatus = 'loading';
      })
      .addCase(editCollection.fulfilled, (state, { payload }) => {
        state.editStatus = 'success';
        state.collection = payload;
      })
      .addCase(editCollection.rejected, (state, { payload }) => {
        state.editStatus = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      });
  },
});

export const { editReset } = editCollectionSlice.actions;
export default editCollectionSlice.reducer;
