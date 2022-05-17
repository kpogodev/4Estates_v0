import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'context/auth/authSlice'

const useCheckAuth = () => {
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((state) => state.auth)
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted.current && !user) {
      dispatch(getUser())
    }

    return () => (isMounted.current = false)
  }, [isAuth, user, dispatch])

  return { isAuth }
}

export default useCheckAuth
