import { describe, test, expect } from '@jest/globals';
import orderReducer, { getOrder } from './OrderSlice';

const initialState = {
  isLoading: false,
  order: null,
  error: null,
};

describe('Order slice tests', () => {
  const mockedOrder = {
    "_id": "676ff87a750864001d3766f6",
    "ingredients": [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093c"
    ],
    "status": "done",
    "name": "Краторный spicy био-марсианский бургер",
    "createdAt": "2024-12-28T13:09:14.491Z",
    "updatedAt": "2024-12-28T13:09:18.188Z",
    "number": 64499
  };

  test('Проверка отработки выставления параметров при getOrder.pending', () => {
    const state = orderReducer(initialState, { type: getOrder.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при getOrder.fulfilled', () => {
    const payload = { orders: [mockedOrder] };
    const state = orderReducer(initialState, {
      type: getOrder.fulfilled.type,
      payload,
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.order).toEqual(mockedOrder);
  });

  test('Проверка отработки выставления параметров при getOrder.rejected', () => {
    const error = 'Failed to fetch order';
    const state = orderReducer(initialState, {
      type: getOrder.rejected.type,
      error: { message: error },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
