import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './shared/Spinner';

const PrivateRoute = () => {
  const { isAuth, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <Spinner />;

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
