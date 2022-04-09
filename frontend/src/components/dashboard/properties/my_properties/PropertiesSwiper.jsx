import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import PropertyThumb from './PropertyThumb'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

function PropertiesSwiper({ properties }) {
  const swiperParams = {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.properties-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.property-next',
      prevEl: '.property-prev',
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  }

  return (
    <>
      <Swiper className='w-full !pb-5' {...swiperParams}>
        {properties.map((property) => (
          <SwiperSlide key={property._id}>
            <PropertyThumb property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='flex items-center justify-center gap-3'>
        <button className='btn btn-circle text-2xl property-prev'>
          <MdChevronLeft className='pointer-events-none' />
        </button>
        <div className='swiper-pagination !relative !bottom-[unset] flex gap-1 !w-fit properties-pagination'></div>
        <button className='btn btn-circle property-next'>
          <MdChevronRight className='pointer-events-none text-2xl' />
        </button>
      </div>
    </>
  )
}

export default PropertiesSwiper
