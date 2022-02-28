import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from '../features/auth/authSlice';

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch, isAuth]);
};
