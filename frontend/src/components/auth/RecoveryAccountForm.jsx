import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdAlternateEmail } from 'react-icons/md'
import { toast } from 'react-toastify'

import { recoverPassword, reset } from '../../features/auth/authSlice'
import { useAuthFormsValidator } from '../../hooks/useAuthFormsValidator'

import Spinner from '../shared/Spinner'
import InputField from '../form/InputField'

function RecoveryAccountForm({ setWasSent }) {
  const [formData, setFormData] = useState({
    email: '',
  })

  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, message } = useSelector((state) => state.auth)
  const { emailValid, validateEmail, setValidityAll } = useAuthFormsValidator()

  useEffect(() => {
    if (isError) {
      toast.error(message)
      setValidityAll(false)
    }

    if (isSuccess) {
      toast.success(message)
      setWasSent(true)
    }

    dispatch(reset())
    // eslint-disable-next-line
  }, [message, isError, isSuccess, setWasSent, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    const validEmail = validateEmail(formData.email)

    if (validEmail) {
      dispatch(recoverPassword(formData.email))
    }
  }

  return (
    <form className='form flex flex-col items-start gap-4 w-full' onSubmit={onSubmit} noValidate>
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
            value={formData?.email}
            placeholder='name@domain.com'
            className='input input-bordered w-full'
            setFormData={setFormData}
            validator={[emailValid, setValidityAll]}
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
