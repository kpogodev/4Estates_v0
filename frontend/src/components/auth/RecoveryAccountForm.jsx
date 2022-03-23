import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdAlternateEmail } from 'react-icons/md'
import { toast } from 'react-toastify'

import { recoverPassword, reset } from '../../features/auth/authSlice'
import useForm from '../../hooks/useForm'

import Spinner from '../shared/Spinner'
import InputField from '../form/InputField'

function RecoveryAccountForm({ setWasSent }) {
  const { formData, isValid, handleChange, handleSubmit } = useForm({
    initialFormData: {
      email: '',
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
    },
    onSubmit: (data) => dispatch(recoverPassword(data.email)),
  })

  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      setWasSent(true)
    }

    dispatch(reset())
    // eslint-disable-next-line
  }, [message, isError, isSuccess, setWasSent, dispatch])

  return (
    <form className='form flex flex-col items-start gap-4 w-full' onSubmit={handleSubmit} noValidate>
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
            value={formData.email}
            placeholder='name@domain.com'
            className='input input-bordered w-full'
            handleChange={handleChange}
            isValid={isValid.email}
          />
        </label>
      </div>
      <button type='submit' className='btn btn-primary text-lg mt-4 flex gap-2 items-center'>
        Send {isLoading && <Spinner className={'w-4 h-h4'} />}
      </button>
    </form>
  )
}

export default RecoveryAccountForm
