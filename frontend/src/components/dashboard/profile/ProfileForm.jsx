import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateProfile,
  resetSuccess,
  resetError,
  selectProfile,
  selectProfileIsLoading,
  selectProfileIsError,
  selectProfileMessage,
  selectProfileIsSuccess,
} from 'redux/profiles/profilesSlice'
import { toast } from 'react-toastify'
import SkeletonItem from 'components/shared/SkeletonItem'
import ProfileFormActions from './ProfileFormActions'
import InputField from 'components/form/InputField'
import useForm from 'hooks/useForm'

function ProfileForm() {
  const [editable, setEditable] = useState(false)
  const [hasBeenEdited, setHasBeenEdited] = useState(false)

  const profile = useSelector(selectProfile)
  const isLoading = useSelector(selectProfileIsLoading)
  const isSuccess = useSelector(selectProfileIsSuccess)
  const isError = useSelector(selectProfileIsError)
  const message = useSelector(selectProfileMessage)

  const dispatch = useDispatch()

  const { formData, isValid, handleChange, handleSubmit, handleReset } = useForm({
    initialFormData: {
      email: profile?.contact?.email ?? '',
      address: profile?.contact?.address ?? '',
      phone: profile?.contact?.phone ?? '',
      fax: profile?.contact?.fax ?? '',
      website: profile?.contact?.website ?? '',
      facebook: profile?.contact?.socials?.facebook ?? '',
      linkedin: profile?.contact?.socials?.linkedin ?? '',
    },
    validations: {
      email: {
        validation: (email) => {
          if (email.length === 0) return true
          const regex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          return regex.test(email.toLowerCase())
        },
        validationErrorMessage: 'Please provide a valid email address',
      },
      phone: {
        validation: (phone) => {
          const regex = new RegExp(/^[\d()\-+ ]+$/)
          return regex.test(phone.toLowerCase())
        },
        validationErrorMessage: 'Please provide a valid phone number',
      },
      fax: {
        validation: (fax) => {
          const regex = new RegExp(/^[\d()\-+ ]+$/)
          return regex.test(fax.toLowerCase())
        },
        validationErrorMessage: 'Please provide a valid fax number',
      },
      website: {
        validation: (website) => {
          const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
          return regex.test(website.toLowerCase())
        },
        validationErrorMessage: 'Please use a valid URL starting with HTTP/HTTPS',
      },
    },
    onSubmit: (data) => {
      const newFormData = {
        contact: {
          email: data.email,
          address: data.address,
          phone: data.phone,
          fax: data.fax,
          website: data.website,
          socials: {
            facebook: data.facebook,
            linkedin: data.linkedin,
          },
        },
      }
      dispatch(updateProfile({ newFormData, profileId: profile._id }))
      setEditable(false)
      setHasBeenEdited(true)
    },
  })

  useEffect(() => {
    if (isSuccess && hasBeenEdited) {
      toast.success('Profile updated successfully!')
      setHasBeenEdited(false)
      dispatch(resetSuccess())
    }

    if (isError) {
      toast.error(message)
      dispatch(resetError())
    }
  }, [isSuccess, isError, message, hasBeenEdited, dispatch])

  if (isLoading)
    return (
      <SkeletonItem className='flex flex-col gap-3'>
        <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
        <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
        <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
        <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
        <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
        <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
        <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
      </SkeletonItem>
    )

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit} noValidate>
      <ProfileFormActions editable={editable} toggleEdit={setEditable} onCancel={handleReset} />
      <div className='form-control w-full relative'>
        <label>
          <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>Email</span>
          <InputField
            name='email'
            type='email'
            className='input input-bordered w-full'
            value={formData.email}
            handleChange={handleChange}
            isValid={isValid.email}
            autoComplete='new-email'
            readOnly={!editable}
          />
        </label>
      </div>
      <div className='form-control w-full relative'>
        <label>
          <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>Address</span>
          <InputField
            name='address'
            type='address'
            className='input input-bordered w-full'
            value={formData.address}
            handleChange={handleChange}
            isValid={isValid.address}
            autoComplete='new-address'
            readOnly={!editable}
          />
        </label>
      </div>
      <div className='form-control w-full relative'>
        <label>
          <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>Phone</span>
          <InputField
            name='phone'
            type='phone'
            className='input input-bordered w-full'
            value={formData.phone}
            handleChange={handleChange}
            isValid={isValid.phone}
            autoComplete='new-phone'
            readOnly={!editable}
          />
        </label>
      </div>
      <div className='form-control w-full relative'>
        <label>
          <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>Fax</span>
          <InputField
            name='fax'
            type='fax'
            className='input input-bordered w-full'
            value={formData.fax}
            handleChange={handleChange}
            isValid={isValid.fax}
            autoComplete='new-fax'
            readOnly={!editable}
          />
        </label>
      </div>
      <div className='form-control w-full relative'>
        <label>
          <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>Website</span>
          <InputField
            name='website'
            type='website'
            className='input input-bordered w-full'
            value={formData.website}
            handleChange={handleChange}
            isValid={isValid.website}
            autoComplete='new-website'
            readOnly={!editable}
          />
        </label>
      </div>
      <div className='form-control w-full relative'>
        <label>
          <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>Facebook</span>
          <InputField
            name='facebook'
            type='facebook'
            className='input input-bordered w-full'
            value={formData.facebook}
            handleChange={handleChange}
            isValid={isValid.facebook}
            autoComplete='new-facebook'
            readOnly={!editable}
          />
        </label>
      </div>
      <div className='form-control w-full relative'>
        <label>
          <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>Linkedin</span>
          <InputField
            name='linkedin'
            type='linkedin'
            className='input input-bordered w-full'
            value={formData.linkedin}
            handleChange={handleChange}
            isValid={isValid.linkedin}
            autoComplete='new-linkedin'
            readOnly={!editable}
          />
        </label>
      </div>
    </form>
  )
}

export default ProfileForm
