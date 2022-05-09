function Avatar({ user }) {
  return (
    <div className='w-10 h-10 rounded-full overflow-hidden'>
      {user?.avatar?.secure_url ? (
        <img src={user?.avatar?.secure_url} alt={user?.name} />
      ) : (
        <span className='w-full h-full grid place-items-center bg-white font-bold text-accent text-2xl border-2 border-accent rounded-full'>
          {user?.name?.split(' ').map((word) => word.charAt(0)?.toUpperCase())}
        </span>
      )}
    </div>
  )
}

export default Avatar
