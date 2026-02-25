import { baseApi } from './baseApi';
import type { AuthUser, User } from '../../entities/user/model/types';

interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

interface LoginResponse extends AuthUser {}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getMe: build.query<User, void>({
      query: () => ({
        url: '/auth/me',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
