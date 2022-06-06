import React from 'react'

function CardLikeButton() {
  return (
    <button className='ml-auto text-gray-500 hover:text-rose-700 transition-colors z-10'>
      <svg className='w-5 h-5 fill-current'>
        <use href='#svg-heart' />
      </svg>
    </button>
  )
}

export default CardLikeButton
