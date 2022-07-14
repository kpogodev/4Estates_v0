import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth, selectIsLoading } from 'redux/auth/authSlice'
import Loading from 'components/common/Loading'

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth)
  const isLoading = useSelector(selectIsLoading)

  if (!isAuth && isLoading) return <Loading />

  return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
