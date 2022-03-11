import { useSelector } from 'react-redux';
import UserAvatar from './UserAvatar';

function UserDetails() {
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);
  
  return (
    <div className='flex items-center gap-4 mt-[-1.2rem]'>
      <UserAvatar user={user} />
      <div className='flex flex-col'>
        <h2 className='font-bold text-2xl'>{user.name}</h2>
      </div>
    </div>
  );
}

export default UserDetails;
