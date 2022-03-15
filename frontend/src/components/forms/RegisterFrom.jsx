import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import InputField from './InputField'
import Spinner from '../shared/Spinner'
import { MdAlternateEmail, MdPassword, MdAccountCircle } from 'react-icons/md'
import { registerUser, reset } from '../../features/auth/authSlice'
import { useAuthFormsValidator } from '../../hooks/useAuthFormsValidator'
import InputRadio from './InputRadio'

function RegisterFrom() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    role: 'user',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth, isError, message, isLoading } = useSelector((state) => state.auth)
  const {
    nameValid,
    emailValid,
    passwordValid,
    rePasswordValid,
    validateName,
    validateEmail,
    validatePassword,
    validateRepeatPassword,
    setValidityAll,
  } = useAuthFormsValidator()

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

    const { name, email, password, rePassword, role } = formData

    const validName = validateName(name)
    const validEmail = validateEmail(email)
    const validPassword = validatePassword(password)
    const validRePassword = validateRepeatPassword(password, rePassword)

    if (validEmail && validName && validPassword && validRePassword) {
      dispatch(
        registerUser({
          name,
          email,
          password,
          role,
        })
      )
    }
  }

  return (
    <form className='form my-4 flex flex-col items-start gap-4 w-full' onSubmit={onSubmit} noValidate>
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
            setFormData={setFormData}
            validator={[nameValid, setValidityAll]}
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
            setFormData={setFormData}
            validator={[rePasswordValid, setValidityAll]}
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
              <InputRadio name='role' value='user' setFormData={setFormData} checked={formData.role === 'user'} />
            </label>
          </div>
          <div className='form-control'>
            <label className='cursor-pointer label flex gap-4'>
              <span className='label-text'>Agency</span>
              <InputRadio name='role' value='agency' setFormData={setFormData} checked={formData.role === 'agency'} />
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
