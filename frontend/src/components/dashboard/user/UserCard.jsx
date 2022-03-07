import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileForm from './ProfileForm';
import UserAvatar from './UserAvatar';

function UserCard() {
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);
  return (
    <div className='card flex flex-col bg-base-100 shadow-lg max-w-md'>
      <div className='w-full h-[4rem] bg-primary'></div>
      <div className='card-body flex flex-col  gap-5 pt-0'>
        <div className='flex items-center gap-4 mt-[-1.2rem]'>
          <UserAvatar user={user} />
          <div className='flex flex-col'>
            <h2 className='font-bold text-2xl'>{user.name}</h2>
          </div>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}

export default UserCard;
