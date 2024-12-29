import { describe, test, expect } from '@jest/globals';
import ingredientsReducer, { getIngredients } from './IngredientSlice';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

describe('Ingredients slice tests', () => {
  const payload = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    },
  ];

  test('Проверка отработки выставления параметров при getIngredients.pending', () => {
    const state = ingredientsReducer(initialState, { type: getIngredients.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при getIngredients.fulfilled', () => {
    const state = ingredientsReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: payload,
    });
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(payload);
  });

  test('Проверка отработки выставления параметров при getIngredients.rejected', () => {
    const error = 'Failed to fetch ingredients';
    const state = ingredientsReducer(initialState, {
      type: getIngredients.rejected.type,
      error: { message: error },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
