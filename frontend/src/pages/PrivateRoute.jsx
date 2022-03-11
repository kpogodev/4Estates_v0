import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loading from '../components/shared/Loading';

const PrivateRoute = () => {
  const { isAuth, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <Loading />;

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
