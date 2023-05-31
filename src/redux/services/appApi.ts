import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../shared/http/axiosBaseQuery';

export const AppApi = createApi({
  reducerPath: 'AppApi',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});

export default AppApi.reducer;
