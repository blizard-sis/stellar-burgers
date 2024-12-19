import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';

type TConstructorState = {
  isLoading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
};

const initialState: TConstructorState = {
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const sendOrder = createAsyncThunk(
  'bconstructor/sendOrder',
  orderBurgerApi
);

const constructorSlice = createSlice({
  name: 'bconstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != action.payload
        );
    },
    ingredientDown: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    ingredientUp: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    clearConstructor: (state) => initialState
  },
  selectors: {
    getConstructorStateSelector: (state) => state,
    getConstructorItemsSelector: (state) => state.constructorItems
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  ingredientDown,
  ingredientUp,
  setOrderRequest,
  clearConstructor
} = constructorSlice.actions;
export const { getConstructorStateSelector, getConstructorItemsSelector } =
  constructorSlice.selectors;
export default constructorSlice.reducer;
