import React from 'react'

function CardSwiperPagination({pagination}) {
  return (
    <div className='badge badge-md flex items-center gap-2 absolute top-3 left-3 z-10'>
      <svg className='w-4 h-4 fill-current'>
        <use href='#svg-photo-camera' />
      </svg>
      <span>{pagination}</span>
    </div>
  )
}

export default CardSwiperPagination