import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import InputField from 'components/form/InputField'
import Spinner from 'components/shared/Spinner'
import { MdAlternateEmail, MdPassword, MdAccountCircle } from 'react-icons/md'
import { registerUser, reset } from 'context/auth/authSlice'
import useForm from 'hooks/useForm'
import InputRadio from 'components/form/InputRadio'

function RegisterFrom() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth, isError, message, isLoading } = useSelector((state) => state.auth)

  // useForm Hook
  const { formData, isValid, handleChange, handleSubmit } = useForm({
    initialFormData: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      role: 'user',
    },
    validations: {
      name: {
        isRequired: 'Please provide your full name',
        validation: (name) => (name.length > 0 && name.length <= 100 ? true : false),
        validationErrorMessage: 'Your name must consist of 1 to 100 characters',
      },
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
      rePassword: {
        isRequired: 'Please repeat your password',
        isSame: {
          values: ['password', 'rePassword'],
          compareErrorMessage: 'Passwords must match',
        },
      },
    },
    onSubmit: (data) => {
      dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        })
      )
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
          <span className='label-text'>Name</span>
        </label>
        <label className='input-group input-group-lg'>
          <span>
            <MdAccountCircle />
          </span>
          <InputField
            name='name'
            type='text'
            placeholder='Joe Doe'
            className='input input-bordered w-full'
            value={formData.name}
            handleChange={handleChange}
            isValid={isValid.name}
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
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Repeat Password</span>
        </label>
        <label className='input-group input-group-lg'>
          <span>
            <MdPassword />
          </span>
          <InputField
            name='rePassword'
            type='password'
            placeholder='********'
            className='input input-bordered w-full'
            value={formData.rePassword}
            handleChange={handleChange}
            isValid={isValid.rePassword}
            autoComplete='new-password2'
          />
        </label>
      </div>
      <div>
        <p>Account type:</p>
        <div className='flex mt-2 gap-4'>
          <div className='form-control'>
            <label className='cursor-pointer label flex gap-4'>
              <span className='label-text'>Private</span>
              <InputRadio name='role' value='user' handleChange={handleChange} checked={formData.role === 'user'} />
            </label>
          </div>
          <div className='form-control'>
            <label className='cursor-pointer label flex gap-4'>
              <span className='label-text'>Agency</span>
              <InputRadio name='role' value='agency' handleChange={handleChange} checked={formData.role === 'agency'} />
            </label>
          </div>
        </div>
      </div>
      <div className='flex items-center w-full mt-6'>
        <button type='submit' className='btn flex gap-2 btn-primary'>
          Sign up {isLoading && <Spinner className={'w-4 h-h4'} />}
        </button>
      </div>
    </form>
  )
}

export default RegisterFrom
