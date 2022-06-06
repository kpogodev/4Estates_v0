import Avatar from 'components/shared/Avatar'
import React from 'react'
import CardLikeButton from './CardLikeButton'
import { selectIsAuth } from 'redux/auth/authSlice'
import { useSelector } from 'react-redux'

function CardContact({ data }) {
  const isAuth = useSelector(selectIsAuth)
  return (
    <div className='flex items-center mt-auto'>
      <a className='mr-3 z-10' href={data?.publisher_profile?.contact?.website} target='_blank' rel='noreferrer'>
        <Avatar user={data.publisher} />
      </a>
      <a
        href={`tel:${data?.publisher_profile?.contact?.phone.replace(/(?<!^)\+|[^\d+]+/g, '')}`}
        className='leading-none font-semibold text-lg mr-6 hover:text-secondary focus-visible:text-secondary transition-colors z-10'
      >
        <div className='flex items-center gap-2 md:hidden'>
          <svg className='w-5 h-5 fill-current'>
            <use href='#svg-phone' />
          </svg>
          <span>Call</span>
        </div>
        <div className='hidden md:flex flex-col items-start'>
          {data?.publisher_profile?.contact?.phone}
          <span className='text-sm font-medium text-gray-500'>Local call rate</span>
        </div>
      </a>
      <a
        href={`mailto:${data?.publisher_profile?.contact?.email}`}
        className='flex items-center leading-none gap-2 font-semibold text-lg hover:text-secondary focus-visible:text-secondary transition-colors z-10'
      >
        <svg className='w-5 h-5 fill-current'>
          <use href='#svg-email' />
        </svg>
        <span>Email</span>
      </a>
      {isAuth && <CardLikeButton />}
    </div>
  )
}

export default CardContact
