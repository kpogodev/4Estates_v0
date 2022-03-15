import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MdPassword } from 'react-icons/md'
import { resetPassword, reset } from '../../features/auth/authSlice'
import { useAuthFormsValidator } from '../../hooks/useAuthFormsValidator'
import InputField from './InputField'
import Spinner from '../shared/Spinner'

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: '',
    rePassword: '',
  })

  const { token } = useParams()
  const dispatch = useDispatch()

  const { isSuccess, isError, message, isLoading } = useSelector((state) => state.auth)
  const { passwordValid, rePasswordValid, validatePassword, validateRepeatPassword, setValidityAll } =
    useAuthFormsValidator()

  useEffect(() => {
    if (isError) {
      toast.error(message)
      setValidityAll(false)
    }

    if (isSuccess) {
      toast.success(message)
    }

    dispatch(reset())
    // eslint-disable-next-line
  }, [isError, message, isSuccess, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()

    const { password, rePassword } = formData

    const validPassword = validatePassword(password)
    const validRePassword = validateRepeatPassword(password, rePassword)

    if (validPassword && validRePassword) {
      dispatch(resetPassword({ password, token }))
    }
  }

  return (
    <form className='form flex flex-col items-start gap-4 w-full' onSubmit={onSubmit}>
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
      <button type='submit' className='btn btn-primary text-lg mt-4 flex gap-2 items-center'>
        Send {isLoading && <Spinner className={'w-4 h-h4'} />}
      </button>
    </form>
  )
}

export default ResetPasswordForm
