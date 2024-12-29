import { describe, test, expect, jest } from '@jest/globals';
import userReducer, {
  getUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
} from './UserSlice';

import { setCookie, deleteCookie } from '../../utils/cookie';
jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

const initialState = {
  isLoading: false,
  isAuthorized: false,
  user: null,
  error: null,
};

describe('User slice tests', () => {
  const mockedUser = {
    email: 'blizard_sis@rambler.ru',
    name: 'blizard',
  };

  const accessToken = 'AccessToken';
  const refreshToken = 'RefreshToken';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Проверка отработки выставления параметров при getUser.pending', () => {
    const state = userReducer(initialState, { type: getUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при getUser.fulfilled', () => {
    const state = userReducer(initialState, {
      type: getUser.fulfilled.type,
      payload: { user: mockedUser },
    });
    expect(state.isLoading).toBe(false);
    expect(state.isAuthorized).toBe(true);
    expect(state.user).toEqual(mockedUser);
  });

  test('Проверка отработки выставления параметров при getUser.rejected', () => {
    const state = userReducer(initialState, { type: getUser.rejected.type });
    expect(state.isLoading).toBe(false);
    expect(state.isAuthorized).toBe(false);
  });

  test('Проверка отработки выставления параметров при loginUser.pending', () => {
    const state = userReducer(initialState, { type: loginUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при loginUser.fulfilled', () => {
    const payload = {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: mockedUser,
    };
  
    const state = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload,
    });
  
    expect(state.isLoading).toBe(false);
    expect(state.isAuthorized).toBe(true);
    expect(state.user).toEqual(payload.user);
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(setCookie).toHaveBeenCalledWith('accessToken', accessToken);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      refreshToken
    );
  });
  

  test('Проверка отработки выставления параметров при loginUser.rejected', () => {
    const error = 'Login failed';
    const state = userReducer(initialState, {
      type: loginUser.rejected.type,
      error: { message: error },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('Проверка отработки выставления параметров при registerUser.pending', () => {
    const state = userReducer(initialState, { type: registerUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при registerUser.fulfilled', () => {
    const state = userReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: { user: mockedUser, accessToken, refreshToken },
    });
    expect(state.isLoading).toBe(false);
    expect(state.isAuthorized).toBe(true);
    expect(state.user).toEqual(mockedUser);
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(setCookie).toHaveBeenCalledWith('accessToken', accessToken);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      refreshToken
    );
  });

  test('Проверка отработки выставления параметров при registerUser.rejected', () => {
    const error = 'Registration failed';
    const state = userReducer(initialState, {
      type: registerUser.rejected.type,
      error: { message: error },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('Проверка отработки выставления параметров при logoutUser.pending', () => {
    const state = userReducer(initialState, { type: logoutUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при logoutUser.fulfilled', () => {
    const state = userReducer(
      { ...initialState, isAuthorized: true, user: mockedUser },
      { type: logoutUser.fulfilled.type }
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthorized).toBe(false);
    expect(state.user).toBeNull();
    expect(deleteCookie).toHaveBeenCalledTimes(1);
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(localStorage.clear).toHaveBeenCalledTimes(1);
  });

  test('Проверка отработки выставления параметров при logoutUser.rejected', () => {
    const error = 'Logout failed';
    const state = userReducer(initialState, {
      type: logoutUser.rejected.type,
      error: { message: error },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('Проверка отработки выставления параметров при updateUser.pending', () => {
    const state = userReducer(initialState, { type: updateUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка отработки выставления параметров при updateUser.fulfilled', () => {
    const state = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: { user: mockedUser },
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockedUser);
  });

  test('Проверка отработки выставления параметров при updateUser.rejected', () => {
    const error = 'Update failed';
    const state = userReducer(initialState, {
      type: updateUser.rejected.type,
      error: { message: error },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
