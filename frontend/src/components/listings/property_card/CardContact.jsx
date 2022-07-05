import Avatar from 'components/common/Avatar'
import React from 'react'
import CardLikeButton from './CardLikeButton'
import { selectIsAuth } from 'redux/auth/authSlice'
import { useSelector } from 'react-redux'

function CardContact({ data }) {
  const isAuth = useSelector(selectIsAuth)

  const websiteLink = data?.publisher_profile?.contact?.website?.length ? data.publisher_profile.contact.website : undefined
  const facebookLink = data?.publisher_profile?.contact?.socials?.facebook?.length ? data.publisher_profile.contact.socials.facebook : undefined
  const linkedinLink = data?.publisher_profile?.contact?.socials?.linkedin?.length ? data.publisher_profile.contact.socials.linkedin : undefined

  return (
    <div className='flex items-center mt-auto'>
      {(data?.publisher_profile?.contact?.website ||
        data?.publisher_profile?.contact?.socials?.facebook ||
        data?.publisher_profile?.contact?.socials?.linkedin) && (
        <a className='mr-3 z-10' href={websiteLink ?? facebookLink ?? linkedinLink} target='_blank' rel='noreferrer'>
          <Avatar user={data.publisher} />
        </a>
      )}
      {data?.publisher?.contact?.phone && (
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
      )}
      {data?.publisher_profile?.contact?.email && (
        <a
          href={`mailto:${data?.publisher_profile?.contact?.email}`}
          className='flex items-center leading-none gap-2 font-semibold text-lg hover:text-secondary focus-visible:text-secondary transition-colors z-10'
        >
          <svg className='w-5 h-5 fill-current'>
            <use href='#svg-email' />
          </svg>
          <span>Email</span>
        </a>
      )}
      {/* {isAuth && <CardLikeButton offer_id={data?._id} />} */}
    </div>
  )
}

export default CardContact
