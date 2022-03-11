import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from '../../../features/profiles/profilesSlice';
import ProfileInput from './ProfileInput';
import SkeletonItem from '../../shared/SkeletonItem';
import ProfileFormActions from './ProfileFormActions';

function ProfileForm() {
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();

  const { profile, isLoading, isError, message } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <form className='flex flex-col gap-3'>
      {isLoading || !profile ? (
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
          <ProfileInput label='Email' type='email' currentValue={profile?.contact.email} editable={editable} />
          <ProfileInput label='Address' type='text' currentValue={profile?.contact.address} editable={editable} />
          <ProfileInput label='Phone' type='text' currentValue={profile?.contact.phone} editable={editable} />
          <ProfileInput label='Fax' type='text' currentValue={profile?.contact.fax} editable={editable} />
          <ProfileInput label='Website' type='text' currentValue={profile?.contact.website} editable={editable} />
          <ProfileInput
            label='Facebook'
            type='text'
            currentValue={profile?.contact.socials.facebook}
            editable={editable}
          />
          <ProfileInput
            label='LinkedIn'
            type='text'
            currentValue={profile?.contact.socials.linkedin}
            editable={editable}
          />
        </>
      )}
    </form>
  );
}

export default ProfileForm;
