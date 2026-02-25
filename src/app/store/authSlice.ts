import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import type { User } from '../../entities/user/model/types';
import { authApi } from '../api/authApi';

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCredentials: (state, action: { payload: { user: User; token: string } }) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setInitialized: (state, action: { payload: boolean }) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      const { id, username, email, firstName, lastName, gender, image } = action.payload;
      state.user = { id, username, email, firstName, lastName, gender, image };
      state.token = action.payload.accessToken ?? null;
    });
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
      state.user = null;
      state.token = null;
    });
    builder.addMatcher(
      (action): action is { type: typeof REHYDRATE } => action.type === REHYDRATE,
      (state) => {
        state.isInitialized = false;
      }
    );
  },
});

export const { logout, setCredentials, setInitialized } = authSlice.actions;
export default authSlice.reducer;
