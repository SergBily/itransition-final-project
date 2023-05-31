import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import createNewItem, { editItemApi, getTagsApi } from '../../shared/apis/itemApi';
import routes from '../../shared/constants/routes';
import ErrorResponse from '../../shared/models/ErrorResponse.model';
import ItemEditRequest from '../../shared/models/items/itemEditRequest.model';
import ItemStructure from '../../shared/models/items/itemStructure.model';
import NewItemRequest from '../../shared/models/items/newItemRequest.model';
import Tags from '../../shared/models/items/tags.module';
import ItemState from '../../shared/models/state/itemState.model';

const initialState: ItemState = {
  status: 'idle',
  editStatus: 'idle',
  tagsStatus: 'idle',
  errorMessage: '',
  errors: [],
  item: null,
  lastItems: [],
  tags: [],
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

export const editItem = createAsyncThunk<string, ItemEditRequest>(
  routes.ITEM_EDIT,
  async (payload, thunkAPI) => {
    try {
      const response = await editItemApi(payload);
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

// export const getLastItems = createAsyncThunk<ItemStructure[], void>(
//   routes.LAST_ITEMS,
//   async (_, thunkAPI) => {
//     try {
//       const response = await getLastItemsApi();
//       const { data } = response;
//       return data;
//     } catch (e) {
//       const error = e as AxiosError;
//       const message = (error.response && error.response.data) as ErrorResponse
//         || error.message || error.toString();
//       return thunkAPI.rejectWithValue((message as ErrorResponse));
//     }
//   },
// );

export const getTags = createAsyncThunk<Tags[], void>(
  routes.TAGS_ITEMS,
  async (_, thunkAPI) => {
    try {
      const response = await getTagsApi();
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
  name: 'item',
  initialState,
  reducers: {
    itemReset: (state) => {
      state.status = 'idle';
      state.errorMessage = '';
      state.errors = [];
      state.editStatus = 'idle';
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
      })
      .addCase(editItem.pending, (state) => {
        state.editStatus = 'loading';
      })
      .addCase(editItem.fulfilled, (state) => {
        state.editStatus = 'success';
      })
      .addCase(editItem.rejected, (state, { payload }) => {
        state.editStatus = 'failed';
        state.errorMessage = (payload as ErrorResponse).message;
        state.errors = (payload as ErrorResponse).errors;
      })
      // .addCase(getLastItems.fulfilled, (state, { payload }) => {
      //   state.lastItems = payload;
      // })
      .addCase(getTags.fulfilled, (state, { payload }) => {
        state.tagsStatus = 'success';
        state.tags = payload;
      });
  },
});

export const { itemReset } = itemSlice.actions;
export default itemSlice.reducer;
