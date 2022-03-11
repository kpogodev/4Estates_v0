import ProfileForm from './ProfileForm';
import UserDetails from './UserDetails';

function ProfileCard() {
  return (
    <div className='card flex flex-col bg-base-100 shadow-lg max-w-md'>
      <div className='w-full h-[4rem] bg-primary'></div>
      <div className='card-body flex flex-col  gap-5 pt-0'>
        <UserDetails />
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfileCard;
