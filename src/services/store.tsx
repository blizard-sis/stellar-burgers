import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/IngredientSlice';
import constructorReducer from './slices/ConstructorSlice';
import userRedicer from './slices/UserSlice';
import feedReducer from './slices/FeedSlice';
import orderReducer from './slices/OrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  bconstructor: constructorReducer,
  user: userRedicer,
  feed: feedReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
