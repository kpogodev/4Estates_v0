import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MdPassword } from 'react-icons/md'
import { resetPassword, reset, selectIsSuccess, selectIsError, selectIsLoading, selectMessage } from 'redux/auth/authSlice'
import useForm from 'hooks/useForm'
import InputField from 'components/inputs/InputField'
import Spinner from 'components/common/Spinner'

function ResetPasswordForm() {
  const isLoading = useSelector(selectIsLoading)
  const isSuccess = useSelector(selectIsSuccess)
  const isError = useSelector(selectIsError)
  const message = useSelector(selectMessage)

  const { token } = useParams()
  const dispatch = useDispatch()

  const { formData, isValid, handleChange, handleSubmit } = useForm({
    initialFormData: {
      password: '',
      rePassword: '',
    },
    validations: {
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
    onSubmit: ({ password }) => dispatch(resetPassword({ password, token })),
  })

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success(message)
    }
    dispatch(reset())
    // eslint-disable-next-line
  }, [isError, message, isSuccess, dispatch])

  return (
    <form className='form flex flex-col items-start gap-4 w-full' onSubmit={handleSubmit} noValidate>
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
      <button type='submit' className='btn btn-primary text-lg mt-4 flex gap-2 items-center'>
        Send {isLoading && <Spinner className={'w-4 h-h4'} />}
      </button>
    </form>
  )
}

export default ResetPasswordForm
