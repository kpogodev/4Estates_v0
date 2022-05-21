import { useSelector } from 'react-redux'
import { selectUser, selectIsLoading } from 'redux/auth/authSlice'
import UserAvatar from './UserAvatar'

function UserDetails() {
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectIsLoading)

  return (
    <div className='flex items-center gap-4 mt-[-1.2rem]'>
      <UserAvatar user={user} loading={isLoading} />
      <div className='flex flex-col'>
        <h2 className='font-bold text-2xl'>{user.name}</h2>
      </div>
    </div>
  )
}

export default UserDetails
