import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  updateProfile } from 'context/profiles/profilesSlice'
import SkeletonItem from 'components/shared/SkeletonItem'
import ProfileFormActions from './ProfileFormActions'
import InputField from 'components/form/InputField'
import useForm from 'hooks/useForm'

function ProfileForm() {
  const [editable, setEditable] = useState(false)

  const { profile, isLoading } = useSelector((state) => state.profiles)
  const dispatch = useDispatch()

  const { formData, isValid, handleChange, handleSubmit } = useForm({
    initialFormData: {
      email: profile?.contact?.email ?? '',
      address: profile?.contact?.address ?? '',
      phone: profile?.contact?.phone ?? '',
      fax: profile?.contact?.fax ?? '',
      website: profile?.contact?.website ?? '',
      facebook: profile?.contact?.socials?.facebook ?? '',
      linkedin: profile?.contact?.socials?.linkedin ?? '',
    },
    validations: {},
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
    },
  })


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
      <ProfileFormActions editable={editable} toggleEdit={setEditable} />
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
