import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, resetSuccess, resetError } from 'context/auth/authSlice'

const useCheckAuth = () => {
  const dispatch = useDispatch()
  const { isAuth, user, isLoading, isSuccess, isError } = useSelector((state) => state.auth)
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      if (isAuth && user) return () => (isMounted.current = false)
      dispatch(getUser())
    }

    return () => (isMounted.current = false)
  }, [isAuth, user, dispatch])

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetSuccess())
    }

    if (isError) {
      dispatch(resetError())
    }
  }, [dispatch, isSuccess, isError])

  return { isLoading }
}

export default useCheckAuth
