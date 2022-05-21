import { useEffect, useId } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { resetSuccess, resetError, selectUser, selectIsAuth, selectIsError, selectIsSuccess, selectMessage } from 'redux/auth/authSlice'
import { pageTransition } from 'utils/animationVariants'
import RegisterFrom from 'components/auth/RegisterFrom'
import Subscribe from 'components/shared/Subscribe'

function Register() {
  const user = useSelector(selectUser)
  const isAuth = useSelector(selectIsAuth)
  const isError = useSelector(selectIsError)
  const isSuccess = useSelector(selectIsSuccess)
  const message = useSelector(selectMessage)

  const dispatch = useDispatch()
  const pageKey = useId()

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(resetError())
    }

    if (isSuccess) {
      toast.success(message)
      dispatch(resetSuccess())
    }
  }, [isError, message, isSuccess, dispatch])
  return (
    <motion.div key={pageKey} className='w-full max-w-md mx-auto' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      {!isAuth && <RegisterFrom />}
      {isAuth && !user?.is_premium.active && <Subscribe allow_skip={true} />}
    </motion.div>
  )
}

export default Register
