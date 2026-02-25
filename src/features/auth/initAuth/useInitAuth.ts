import { useEffect } from 'react';
import { useGetMeQuery } from '../../../app/api/authApi';
import { selectAuthToken } from '../../../app/store/selectors';
import { setInitialized } from '../../../app/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';

export function useInitAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuthToken);
  const { isUninitialized, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      dispatch(setInitialized(true));
      return;
    }
    if (!isUninitialized && !isLoading) {
      dispatch(setInitialized(true));
    }
  }, [token, isUninitialized, isLoading, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(setInitialized(true));
    }
  }, [isError, dispatch]);
}
