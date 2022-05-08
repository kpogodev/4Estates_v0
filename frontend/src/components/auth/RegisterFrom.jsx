import { useId } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import InputField from 'components/form/InputField'
import { MdAlternateEmail, MdPassword, MdAccountCircle } from 'react-icons/md'
import { registerUser } from 'context/auth/authSlice'
import useForm from 'hooks/useForm'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'

function RegisterFrom() {
  const dispatch = useDispatch()
  const formKey = useId()

  // useForm Hook
  const { formData, isValid, handleChange, handleSubmit } = useForm({
    initialFormData: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
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
        })
      )
    },
  })

  return (
    <motion.div key={formKey} variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <h1 className='text-6xl font-bold'>Sign Up</h1>
      <p className='text-xl mt-2'>
        Already have an account?{' '}
        <Link className='btn btn-link p-0 text-xl' to='/login'>
          Log in
        </Link>
      </p>
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
        <div className='flex items-center w-full mt-6'>
          <button type='submit' className='btn flex gap-2 btn-primary ml-auto'>
            Sign up
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default RegisterFrom
