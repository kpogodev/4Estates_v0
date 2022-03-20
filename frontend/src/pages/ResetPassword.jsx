import { motion } from 'framer-motion'
import ResetPasswordForm from '../components/auth/ResetPasswordForm'
import { pageTransition } from '../utils/animationVariants'

function ResetPassword() {
  return (
    <motion.div
      className='w-full max-w-md mx-auto'
      variants={pageTransition}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <h1 className='text-6xl font-bold'>Rest Password</h1>
      <p className='text-xl my-4'>Please provide a new password.</p>
      <ResetPasswordForm />
    </motion.div>
  )
}

export default ResetPassword
