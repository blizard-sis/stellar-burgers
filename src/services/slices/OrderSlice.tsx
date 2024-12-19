import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export interface OrderState {
  isLoading: boolean;
  order: TOrder | null;
  error: string | null | undefined;
}

const initialState: OrderState = {
  isLoading: false,
  order: null,
  error: null
};

export const getOrder = createAsyncThunk('order/getOrder', getOrderByNumberApi);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state,
    getOrderLoadingStatus: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { getOrderSelector, getOrderLoadingStatus } = orderSlice.selectors;

export default orderSlice.reducer;
