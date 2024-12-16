import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export type TStateIngredients = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
};

const initialState: TStateIngredients = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsStateSelector: (state) => state,
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientLoadingStatus: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getIngredientsStateSelector,
  getIngredientsSelector,
  getIngredientLoadingStatus
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
