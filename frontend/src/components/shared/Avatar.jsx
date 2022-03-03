import React from 'react';

function Avatar({ className }) {
  const img = false;
  return (
    <div className={className}>
      {img ? (
        <img src='https://api.lorem.space/image/face?hash=33791' alt='profile' />
      ) : (
        <span className='w-full h-full grid place-items-center bg-white font-bold text-accent text-2xl border-2 border-accent rounded-full'>
          K
        </span>
      )}
    </div>
  );
}

export default Avatar;
