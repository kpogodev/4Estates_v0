import { motion } from 'framer-motion'
import ResetPasswordForm from 'components/auth/ResetPasswordForm'
import { pageTransition } from 'utils/animationVariants'

function ResetPassword() {
  return (
    <motion.div className='container flex flex-col mx-auto py-5 md:py-12 px-3' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <div className='w-full max-w-md mx-auto'>
        <h1 className='text-6xl font-bold'>Rest Password</h1>
        <p className='text-xl my-4'>Please provide a new password.</p>
      </div>
      <ResetPasswordForm />
    </motion.div>
  )
}

export default ResetPassword
