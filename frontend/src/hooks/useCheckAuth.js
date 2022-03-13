import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, resetSuccess } from '../features/auth/authSlice'

export const useCheckAuth = () => {
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(resetSuccess())
    if (isAuth && user) return
    dispatch(getUser())
  }, [isAuth, user, dispatch])
}
