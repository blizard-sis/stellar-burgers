import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  TLoginData,
  TRegisterData,
  getUserApi,
  updateUserApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export type TStateUser = {
  isLoading: boolean;
  isAuthorized: boolean;
  user: TUser | null;
  error: string | null | undefined;
};

const initialState: TStateUser = {
  isLoading: false,
  isAuthorized: false,
  user: null,
  error: null
};

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => loginUserApi(loginData)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: TRegisterData) => registerUserApi(user)
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: TRegisterData) => updateUserApi(user)
);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserStateSelector: (state) => state,
    getUserSelector: (state) => state.user,
    getIsAuthorizedSelector: (state) => state.isAuthorized,
    getUserLoadingStatusSelector: (state) => state.isLoading,
    getUserErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthorized = false;
        state.user = null;
        deleteCookie('accessToken');
        localStorage.clear();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getUserStateSelector,
  getUserSelector,
  getIsAuthorizedSelector,
  getUserLoadingStatusSelector,
  getUserErrorSelector
} = userSlice.selectors;

export default userSlice.reducer;
