import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, reset } from '../features/auth/authSlice'
import { MdAlternateEmail, MdPassword } from 'react-icons/md'
import { motion } from 'framer-motion'
import { pageTransition } from '../utils/animationVariants'
import Spinner from '../components/shared/Spinner'

function Login() {
  const [email, setEmail] = useState('')
  const [emailFocused, setEmailFocus] = useState(false)
  const [emailValid, setEmailValid] = useState(null)

  const [password, setPassword] = useState('')
  const [passwordFocused, setPasswordFocus] = useState(false)
  const [passwordValid, setPasswordValid] = useState(null)

  const dispatch = useDispatch()
  const { isAuth, isError, message, isLoading } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
      setPasswordValid(null)
      setEmailValid(null)
    }

    if (isAuth) {
      navigate('/')
      toast.success(message)
    }

    dispatch(reset())
  }, [isError, message, isAuth, navigate, dispatch])

  const validateEmail = (e) => {
    setEmailFocus(false)
    const isValid = e.target.value
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ? true
      : false
    setEmailValid(isValid)
    if (!isValid && email.length > 0) return toast.error('Please provide valid email address')
  }

  const validatePassword = (e) => {
    setPasswordFocus(false)
    const isValid = e.target.value.length > 0 ? true : false
    setPasswordValid(isValid)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
    setEmail('')
    setPassword('')
  }

  const isBtnDisabled = () => (email === '' || password === '' ? 'btn-disabled' : 'btn-primary')

  return (
    <motion.div className='w-full max-w-md mx-auto' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <h1 className='text-6xl font-bold'>Sign In</h1>
      <p className='text-xl mt-2'>
        Don't have an account?{' '}
        <Link className='btn btn-link p-0 text-xl' to='/register'>
          Register
        </Link>
      </p>
      <form className='form my-4 flex flex-col items-start gap-4 w-full' onSubmit={onSubmit}>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Your Email</span>
          </label>
          <label className='input-group input-group-lg'>
            <span>
              <MdAlternateEmail className={`transition ${emailFocused && 'text-info'} ${emailValid && 'text-success'} ${emailValid === false && email !== '' && 'text-error'}`} />
            </span>
            <input
              type='email'
              placeholder='name@domain.com'
              className={`input input-bordered w-full ${emailValid && 'input-success'} ${emailValid === false && email !== '' && 'input-error'}`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              onFocus={() => setEmailFocus(true)}
              onBlur={validateEmail}
            />
          </label>
        </div>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <label className='input-group input-group-lg'>
            <span>
              <MdPassword className={`transition ${passwordFocused && 'text-info'} ${passwordValid && 'text-success'}`} />
            </span>
            <input
              type='password'
              placeholder='********'
              className={`input input-bordered w-full ${passwordValid && 'input-success'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={validatePassword}
            />
          </label>
        </div>
        <div className='flex justify-between items-center w-full mt-6'>
          <Link className='btn btn-link capitalize text-xl' to='/recover'>
            Forgotten your password?
          </Link>
          <button type='submit' className={`btn flex gap-2 ${isBtnDisabled()}`}>
            Sign in {isLoading && <Spinner className={'w-4 h-h4'} />}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Login
