import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import LoginForm from 'components/auth/LoginForm'

function Login() {
  return (
    <motion.div className='w-full mx-auto px-3' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <div className='w-full max-w-md mx-auto '>
        <h1 className='text-6xl font-bold'>Sign In</h1>
        <p className='text-xl mt-2'>
          Don't have an account?{' '}
          <Link className='btn btn-link p-0 text-xl' to='/register'>
            Register
          </Link>
        </p>
        <LoginForm />
      </div>
    </motion.div>
  )
}

export default Login
