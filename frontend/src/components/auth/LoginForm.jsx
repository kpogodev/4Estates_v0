import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import InputField from '../form/InputField'
import Spinner from '../shared/Spinner'
import { MdAlternateEmail, MdPassword } from 'react-icons/md'
import { loginUser, reset } from '../../features/auth/authSlice'
import useForm from '../../hooks/useForm'

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // From Redux State
  const { isAuth, isError, message, isLoading } = useSelector((state) => state.auth)

  // useForm Hook
  const { formData, isValid, handleChange, handleSubmit } = useForm({
    initialFormData: {
      email: '',
      password: '',
    },
    validations: {
      email: {
        isRequired: 'Please provide your email address',
        validation: (email) => {
          const regex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          return regex.test(email.toLowerCase())
        },
        validationErrorMessage: 'Please provide a valid email address',
      },
      password: {
        isRequired: 'Please provide your password',
      },
    },
    onSubmit: (data) => {
      dispatch(loginUser(data))
    },
  })

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isAuth) {
      navigate('/')
      toast.success(message)
    }

    dispatch(reset())
    // eslint-disable-next-line
  }, [isError, message, isAuth, navigate, dispatch])

  return (
    <form className='form my-4 flex flex-col items-start gap-4 w-full' onSubmit={handleSubmit} noValidate>
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
            handleChange={handleChange}
            isValid={isValid.email}
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
            handleChange={handleChange}
            isValid={isValid.password}
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
