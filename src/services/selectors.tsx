import { RootState } from '@store';

export const getIngredientById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((ingredient) => ingredient._id === id);
