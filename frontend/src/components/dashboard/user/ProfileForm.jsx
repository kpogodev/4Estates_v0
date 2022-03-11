import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from '../../../features/profiles/profilesSlice';
import ProfileInput from './ProfileInput';
import SkeletonItem from '../../shared/SkeletonItem';
import { MdEditNote, MdCancel, MdOutlineDone } from 'react-icons/md';

function ProfileForm() {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const { profile, isLoading, isError, message } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <form className='flex flex-col gap-3'>
      <div className='flex justify-end gap-2 items-center'>
        <p className='text-xl font-semibold mr-auto'>Contact Details:</p>
        {edit ? (
          <>
            <button
              type='button'
              className={`btn btn-sm btn-outline btn-error text-lg capitalize font-semibold flex items-center gap-1`}
              onClick={() => setEdit((prevState) => !prevState)}
            >
              <MdCancel />
              <span>Cancel</span>
            </button>
            <button className='btn btn-sm btn-outline btn-success text-lg capitalize font-semibold flex items-center gap-1'>
              <MdOutlineDone />
              <span>Save</span>
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              className={`btn btn-sm btn-outline btn-primary text-lg capitalize font-semibold flex items-center gap-1`}
              onClick={() => setEdit((prevState) => !prevState)}
            >
              <MdEditNote className='w-6 h-6' />
              <span>Edit</span>
            </button>
          </>
        )}
      </div>
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
          <ProfileInput label='Email' type='email' currentValue={profile?.contact.email} editable={edit} />
          <ProfileInput label='Address' type='text' currentValue={profile?.contact.address} editable={edit} />
          <ProfileInput label='Phone' type='text' currentValue={profile?.contact.phone} editable={edit} />
          <ProfileInput label='Fax' type='text' currentValue={profile?.contact.fax} editable={edit} />
          <ProfileInput label='Website' type='text' currentValue={profile?.contact.website} editable={edit} />
          <ProfileInput label='Facebook' type='text' currentValue={profile?.contact.socials.facebook} editable={edit} />
          <ProfileInput label='LinkedIn' type='text' currentValue={profile?.contact.socials.linkedin} editable={edit} />
        </>
      )}
    </form>
  );
}

export default ProfileForm;
