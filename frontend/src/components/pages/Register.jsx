import { useEffect, useId } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { resetSuccess, resetError, selectUser, selectIsAuth, selectIsError, selectIsSuccess, selectMessage } from 'redux/auth/authSlice'
import { pageTransition } from 'utils/animationVariants'
import RegisterFrom from 'components/auth/RegisterFrom'
import Subscribe from 'components/common/Subscribe'

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
    <motion.div
      key={pageKey}
      className='container flex flex-col mx-auto py-5 md:py-12 px-3'
      variants={pageTransition}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <div className='w-full max-w-md mx-auto'>
        {!isAuth && <RegisterFrom />}
        {isAuth && !user?.is_premium.active && <Subscribe allow_skip={true} />}
      </div>
    </motion.div>
  )
}

export default Register
