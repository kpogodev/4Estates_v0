import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import no_image_src from 'assets/no-image.png'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { nanoid } from '@reduxjs/toolkit'
import CardSwiperPagination from './CardSwiperPagination'

function CardSwiper({ images }) {
  const [pagination, setPagination] = useState('')
  const swiperRef = useRef(null)

  const swiperConfig = {
    slidesPerView: 1,
    modules: [Navigation],
    navigation: true,
    loop: images.length >= 2,
    spaceBetween: 2,
    breakpoints: {
      1536: {
        slidesPerView: images.length >= 2 ? 2 : 1,
      },
    },
    onInit: ({ realIndex }) => setPagination(`${realIndex + 1} / ${images.length}`),
    onSlideChange: ({ realIndex }) => setPagination(`${realIndex + 1} / ${images.length}`),
    onUpdate: ({ realIndex }) => setPagination(`${realIndex + 1} / ${images.length}`),
    onSwiper: (swiper) => (swiperRef.current = swiper),
  }

  return (
    <>
      {images.length > 0 && <CardSwiperPagination pagination={pagination} />}
      <Swiper
        className='w-full h-[250px] md:h-[270px] md:mb-[76.5px] md:w-[270px] md:min-w-[270px] 2xl:w-[530px] 2xl:min-w-[530px] lg:max-h-[200px] bg-black'
        {...swiperConfig}
        style={{
          '--swiper-navigation-size': '24px',
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
      >
        {images.length > 0 ? (
          images.map((img) => (
            <SwiperSlide key={img?.cloudinary_id}>
              <img className='w-full h-full object-cover' src={img?.secure_url} alt={img?.cloudinary_id} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key={nanoid()}>
            <img className='w-full h-full object-contain' src={no_image_src} alt='Placeholder' />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  )
}

export default CardSwiper
