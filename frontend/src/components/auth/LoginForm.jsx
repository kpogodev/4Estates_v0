import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import InputField from '../form/InputField'
import Spinner from '../shared/Spinner'
import { MdAlternateEmail, MdPassword } from 'react-icons/md'
import { loginUser, reset } from '../../features/auth/authSlice'
import { useAuthFormsValidator } from '../../hooks/useAuthFormsValidator'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  //From Redux
  const dispatch = useDispatch()
  const { isAuth, isError, message, isLoading } = useSelector((state) => state.auth)

  const { emailValid, passwordValid, validateEmail, validatePassword, setValidityAll } = useAuthFormsValidator()

  useEffect(() => {
    if (isError) {
      toast.error(message)
      setValidityAll(false)
    }

    if (isAuth) {
      navigate('/')
      toast.success(message)
    }

    dispatch(reset())
    // eslint-disable-next-line
  }, [isError, message, isAuth, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    const validEmail = validateEmail(formData.email)
    const validPassword = validatePassword(formData.password)

    if (validEmail && validPassword) {
      dispatch(loginUser(formData))
    }
  }

  return (
    <form className='form my-4 flex flex-col items-start gap-4 w-full' onSubmit={onSubmit}>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Your Email</span>
        </label>
        <label className='input-group input-group-lg'>
          <span>
            <MdAlternateEmail />
          </span>
          <InputField
            name='email'
            type='email'
            placeholder='name@domain.com'
            className='input input-bordered w-full'
            value={formData.email}
            setFormData={setFormData}
            validator={[emailValid, setValidityAll]}
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
            <MdPassword />
          </span>
          <InputField
            name='password'
            type='password'
            placeholder='********'
            className='input input-bordered w-full'
            value={formData.password}
            setFormData={setFormData}
            validator={[passwordValid, setValidityAll]}
            autoComplete='new-password'
          />
        </label>
      </div>
      <div className='flex justify-between items-center w-full mt-6'>
        <Link className='btn btn-link capitalize text-xl' to='/recover'>
          Forgotten your password?
        </Link>
        <button type='submit' className='btn btn-primary flex gap-2'>
          Sign in {isLoading && <Spinner className={'w-4 h-h4'} />}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
