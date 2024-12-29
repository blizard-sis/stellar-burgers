import { describe, test, expect } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  ingredientUp,
  ingredientDown,
  clearConstructor,
  sendOrder,
  setOrderRequest,
} from './ConstructorSlice';
import { TConstructorIngredient } from '@utils-types';


jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'mockedID'),
}));

describe('Constructor slice tests', () => {

  const bun1: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa093d',
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
  };

  const bun2: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa093c',
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
  };

  const ingredient1: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0942',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  };

  const ingredient2: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0941',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  };

  const initialState = {
    isLoading: false,
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('Проверка добавления ингридиента', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(ingredient1)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient1,
      id: 'mockedID',
    });
  });

  test('Проверка добавления булки', () => {
    const newState = constructorReducer(initialState, addIngredient(bun1));
    expect(newState.constructorItems.bun).toEqual({
      ...bun1,
      id: 'mockedID',
    });
  });

  test('Проверка замены булки', () => {
    const stateWithBun = constructorReducer(initialState, addIngredient(bun1));
    const newState = constructorReducer(stateWithBun, addIngredient(bun2));
    expect(newState.constructorItems.bun).toEqual({
      ...bun2,
      id: 'mockedID', 
    });
  });
  
  test('Проверка удаления булки', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: bun1,
        ingredients: [ingredient1, ingredient2],
      },
    };

    const newState = constructorReducer(
      stateWithIngredients,
      removeIngredient('643d69a5c3f7b9001cfa0942')
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual(ingredient2);
  });

  test('Проверка изменения позиции ингридиентов вверх', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2],
      },
    };

    const newState = constructorReducer(
      stateWithIngredients,
      ingredientUp(1)
    );

    expect(newState.constructorItems.ingredients[0]).toEqual(ingredient2);
    expect(newState.constructorItems.ingredients[1]).toEqual(ingredient1);
  });

  test('Проверка изменения позиции ингридиентов ввниз', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2],
      },
    };

    const newState = constructorReducer(
      stateWithIngredients,
      ingredientDown(0)
    );

    expect(newState.constructorItems.ingredients[0]).toEqual(ingredient2);
    expect(newState.constructorItems.ingredients[1]).toEqual(ingredient1);
  });

  test('Проверка замены состояния ордера', () => {
    const stateWithOrderRequestFalse = { ...initialState, orderRequest: false };
  
    const stateWithOrderRequestTrue = constructorReducer(
      stateWithOrderRequestFalse,
      { type: setOrderRequest.type, payload: true }
    );
    expect(stateWithOrderRequestTrue.orderRequest).toBe(true);
  
    const stateWithOrderRequestFalseAgain = constructorReducer(
      stateWithOrderRequestTrue,
      { type: setOrderRequest.type, payload: false }
    );
    expect(stateWithOrderRequestFalseAgain.orderRequest).toBe(false);
  });  

  test('Проверка очистки конструктора', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: bun1,
        ingredients: [ingredient1, ingredient2],
      },
    };

    const newState = constructorReducer(stateWithIngredients, clearConstructor());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  test('Проверка отработки выставления параметров при sendOrder.pending', () => {
    const state = constructorReducer(initialState, { type: sendOrder.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Проверка отработки выставления параметров при sendOrder.fulfilled', () => {
    const payload = { order: { id: 'order-id', name: 'test order' } };
    const state = constructorReducer(initialState, { type: sendOrder.fulfilled.type, payload });
    expect(state.isLoading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(payload.order);
  });
  
  test('Проверка отработки выставления параметров при sendOrder.rejected', () => {
    const error = 'Error message';
    const state = constructorReducer(initialState, { type: sendOrder.rejected.type, error: { message: error } });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
  
});
