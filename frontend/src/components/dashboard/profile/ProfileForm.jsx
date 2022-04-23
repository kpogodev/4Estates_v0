import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile, updateProfile } from 'context/profiles/profilesSlice'
import ProfileInput from './ProfileInput'
import SkeletonItem from 'components/shared/SkeletonItem'
import ProfileFormActions from './ProfileFormActions'

function ProfileForm() {
  console.count('ProfileForm')
  const [formData, setFormData] = useState({})
  const [editable, setEditable] = useState(false)

  const dispatch = useDispatch()

  const { profile, isLoading } = useSelector((state) => state.profiles)

  useEffect(() => {
    dispatch(getMyProfile())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newFormData = {
      contact: {
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        fax: formData.fax,
        website: formData.website,
        socials: {
          facebook: formData.facebook,
          linkedin: formData.linkedin,
        },
      },
    }

    dispatch(updateProfile({ newFormData, profileId: profile._id }))
    setEditable(false)
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      {isLoading ? (
        <>
          <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
          <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
          <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
          <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
          <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
          <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
          <SkeletonItem className='w-full h-[48px] bg-[#ccc] rounded-md animate-pulse' />
        </>
      ) : (
        <>
          <ProfileFormActions editable={editable} toggleEdit={setEditable} />
          <ProfileInput name='email' label='Email' type='email' currentValue={profile?.contact?.email} editable={editable} setFormData={setFormData} />
          <ProfileInput name='address' label='Address' type='text' currentValue={profile?.contact?.address} editable={editable} setFormData={setFormData} />
          <ProfileInput name='phone' label='Phone' type='text' currentValue={profile?.contact?.phone} editable={editable} setFormData={setFormData} />
          <ProfileInput name='fax' label='Fax' type='text' currentValue={profile?.contact?.fax} editable={editable} setFormData={setFormData} />
          <ProfileInput name='website' label='Website' type='text' currentValue={profile?.contact?.website} editable={editable} setFormData={setFormData} />
          <ProfileInput
            name='facebook'
            label='Facebook'
            type='text'
            currentValue={profile?.contact?.socials?.facebook}
            editable={editable}
            setFormData={setFormData}
          />
          <ProfileInput
            name='linkedin'
            label='LinkedIn'
            type='text'
            currentValue={profile?.contact?.socials?.linkedin}
            editable={editable}
            setFormData={setFormData}
          />
        </>
      )}
    </form>
  )
}

export default ProfileForm
