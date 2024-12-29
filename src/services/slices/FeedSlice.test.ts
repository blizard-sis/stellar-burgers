import { describe, test, expect } from '@jest/globals';
import feedReducer, { getFeed, getProfileFeed } from './FeedSlice';

const initialState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

describe('Feed slice tests', () => {
  const payload = {
    "success": true,
    "orders": [
        {
            "_id": "67629d79750864001d372367",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0940",
                "643d69a5c3f7b9001cfa093f",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Метеоритный флюоресцентный бессмертный бургер",
            "createdAt": "2024-12-18T10:01:29.102Z",
            "updatedAt": "2024-12-18T10:01:30.119Z",
            "number": 63171
        },
        {
            "_id": "676fda25750864001d3766c8",
            "ingredients": [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa0942",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa093c"
            ],
            "status": "done",
            "name": "Краторный spicy люминесцентный бургер",
            "createdAt": "2024-12-28T10:59:49.632Z",
            "updatedAt": "2024-12-28T10:59:50.516Z",
            "number": 64491
        },
    ],
    "total": 64129,
    "totalToday": 59
  };

  test('Проверка отработки выставления параметров при getFeed.pending', () => {
    const state = feedReducer(initialState, { type: getFeed.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при getFeed.fulfilled', () => {
    const state = feedReducer(initialState, {
      type: getFeed.fulfilled.type,
      payload,
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(payload.total);
    expect(state.totalToday).toBe(payload.totalToday);
  });

  test('Проверка отработки выставления параметров при getFeed.rejected', () => {
    const error = 'Failed to fetch feed';
    const state = feedReducer(initialState, {
      type: getFeed.rejected.type,
      error: { message: error },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('Проверка отработки выставления параметров при getProfileFeed.pending', () => {
    const state = feedReducer(initialState, {
      type: getProfileFeed.pending.type,
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при getProfileFeed.fulfilled', () => {
    const state = feedReducer(initialState, {
      type: getProfileFeed.fulfilled.type,
      payload,
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(payload);
  });

  test('Проверка отработки выставления параметров при getProfileFeed.rejected', () => {
    const error = 'Failed to fetch profile feed';
    const state = feedReducer(initialState, {
      type: getProfileFeed.rejected.type,
      error: { message: error },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
