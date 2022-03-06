import React from 'react';

function Avatar({ className, user }) {
  return (
    <div className={className}>
      {user?.avatar?.secure_url ? (
        <img src={user?.avatar?.secure_url} alt={user?.name} />
      ) : (
        <span className='w-full h-full grid place-items-center bg-white font-bold text-accent text-2xl border-2 border-accent rounded-full'>
          {user?.name?.charAt(0)?.toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default Avatar;
