import { expect, test } from '@jest/globals';
import { rootReducer } from './store';
import store from './store';

describe('Тест rootReducer', () => {
  test('проверка инициализации rootReducer', () => {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, testAction);
    expect(initialState).toEqual(store.getState());
  });
});