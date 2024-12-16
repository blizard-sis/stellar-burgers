import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export interface TFeedState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null | undefined;
}

const initialState: TFeedState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const getFeed = createAsyncThunk('feed/getFeed', async () =>
  getFeedsApi()
);

export const getProfileFeed = createAsyncThunk(
  'feed/getProfileFeed',
  async () => getOrdersApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedStateSelector: (state) => state,
    getOrdersSelector: (state) => state.orders,
    getFeedLoadingStatusSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProfileFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getFeedStateSelector,
  getOrdersSelector,
  getFeedLoadingStatusSelector
} = feedSlice.selectors;

export default feedSlice.reducer;
