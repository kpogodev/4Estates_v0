import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, reset } from '../features/auth/authSlice'
import { MdAlternateEmail, MdPassword, MdAccountCircle } from 'react-icons/md'
import { motion } from 'framer-motion'
import { pageTransition } from '../utils/animationVariants'
import Spinner from '../components/shared/Spinner'

function Register() {
  const [name, setName] = useState('')
  const [nameFocused, setNameFocus] = useState(false)
  const [nameValid, setNameValid] = useState(null)

  const [email, setEmail] = useState('')
  const [emailFocused, setEmailFocus] = useState(false)
  const [emailValid, setEmailValid] = useState(null)

  const [password, setPassword] = useState('')
  const [passwordFocused, setPasswordFocus] = useState(false)
  const [passwordValid, setPasswordValid] = useState(null)

  const [rePassword, setRePassword] = useState('')
  const [rePasswordFocused, setRePasswordFocus] = useState(false)
  const [rePasswordValid, setRePasswordValid] = useState(null)

  const [role, setRole] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth, isError, message, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
      setEmailValid(null)
      setPasswordValid(null)
      setRePasswordValid(null)
    }

    if (isAuth) {
      navigate('/')
      toast.success(message)
    }

    dispatch(reset())
    // eslint-disable-next-line
  }, [isError, message, isAuth, navigate, dispatch])

  const validateName = (e) => {
    setNameFocus(false)
    const isValid = e.target.value.length > 0 ? true : false
    if (!isValid) toast.error('Please provide a name')
    setNameValid(isValid)
  }

  const validateEmail = (e) => {
    setEmailFocus(false)
    const isValid = e.target.value
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ? true
      : false

    if (!isValid && email.length > 0) return toast.error('Please provide valid email address')
    setEmailValid(isValid)
  }

  const validatePassword = (e) => {
    setPasswordFocus(false)
    const isValid = e.target.value.length > 0 ? true : false
    setPasswordValid(isValid)
  }

  const validateRePassword = (e) => {
    setRePasswordFocus(false)
    const isValid = e.target.value === password ? true : false
    if (!isValid) {
      toast.error('Passwords must match')
    }
    setRePasswordValid(isValid)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name,
      email,
      password,
      role,
    }

    dispatch(registerUser(formData))

    setName('')
    setEmail('')
    setPassword('')
    setRePassword('')
    setRole(null)
  }

  const isDisabled = () => {
    if (email === '' || password === '' || rePassword === '' || !rePasswordValid || !role) return 'btn-disabled'
    return 'btn-primary'
  }

  return (
    <motion.div className='w-full max-w-md mx-auto' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <h1 className='text-6xl font-bold'>Sign Up</h1>
      <p className='text-xl mt-2'>
        Already have an account?{' '}
        <Link className='btn btn-link p-0 text-xl' to='/login'>
          Log in
        </Link>
      </p>
      <form className='form my-4 flex flex-col items-start gap-4 w-full' onSubmit={onSubmit}>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Name</span>
          </label>
          <label className='input-group input-group-lg'>
            <span>
              <MdAccountCircle className={`transition ${nameFocused && 'text-info'} ${nameValid && 'text-success'} ${nameValid === false && 'text-error'}`} />
            </span>
            <input
              type='text'
              placeholder='Joe Doe'
              className={`input input-bordered w-full ${nameValid && 'input-success'} ${nameValid === false && 'input-error'}`}
              onChange={(e) => setName(e.target.value)}
              value={name}
              onFocus={() => setNameFocus(true)}
              onBlur={validateName}
              autoComplete='new-name'
            />
          </label>
        </div>
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
              autoComplete='new-email'
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
              autoComplete='new-password'
            />
          </label>
        </div>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Repeat Password</span>
          </label>
          <label className='input-group input-group-lg'>
            <span>
              <MdPassword className={`transition ${rePasswordFocused && 'text-info'} ${rePasswordValid && 'text-success'} ${rePasswordValid === false && 'text-error'}`} />
            </span>
            <input
              type='password'
              placeholder='********'
              className={`input input-bordered w-full ${rePasswordValid && 'input-success'} ${rePasswordValid === false && 'input-error'}`}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              onFocus={() => setRePasswordFocus(true)}
              onBlur={validateRePassword}
              autoComplete='new-password'
            />
          </label>
        </div>
        <div>
          <p>Account type:</p>
          <div className='flex mt-2 gap-4'>
            <div className='form-control'>
              <label className='cursor-pointer label flex gap-4'>
                <span className='label-text'>Private</span>
                <input type='radio' value='user' onChange={(e) => setRole(e.target.value)} className='radio checked:bg-success' checked={role === 'user'} />
              </label>
            </div>
            <div className='form-control'>
              <label className='cursor-pointer label flex gap-4'>
                <span className='label-text'>Agency</span>
                <input type='radio' value='agency' onChange={(e) => setRole(e.target.value)} className='radio checked:bg-success' checked={role === 'agency'} />
              </label>
            </div>
          </div>
        </div>
        <div className='flex items-center w-full mt-6'>
          <button type='submit' className={`btn ${isDisabled()}`}>
            Sign up {isLoading && <Spinner className={'w-4 h-h4'} />}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Register
