import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import RegisterFrom from 'components/auth/RegisterFrom'

function Register() {
  return (
    <motion.div className='w-full max-w-md mx-auto' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <h1 className='text-6xl font-bold'>Sign Up</h1>
      <p className='text-xl mt-2'>
        Already have an account?{' '}
        <Link className='btn btn-link p-0 text-xl' to='/login'>
          Log in
        </Link>
      </p>
      <RegisterFrom />
    </motion.div>
  )
}

export default Register
