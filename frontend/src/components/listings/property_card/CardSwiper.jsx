import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

function CardSwiper({ images }) {
  const [pagination, setPagination] = useState('')

  const swiperRef = useRef(null)

  const swiperConfig = {
    slidesPerView: 1,
    modules: [Navigation],
    navigation: true,
    loop: true,
    spaceBetween: 2,
    breakpoints: {
      1024: {
        slidesPerView: 2,
      },
    },
    onInit: ({ realIndex }) => setPagination(`${realIndex + 1} / ${images.length}`),
    onSlideChange: ({ realIndex }) => setPagination(`${realIndex + 1} / ${images.length}`),
    onUpdate: ({ realIndex }) => setPagination(`${realIndex + 1} / ${images.length}`),
    onSwiper: (swiper) => (swiperRef.current = swiper),
  }

  return (
    <>
      <div className='badge badge-md flex items-center gap-2 absolute top-3 left-3 z-10'>
        <svg className='w-4 h-4 fill-current'>
          <use href='#svg-photo-camera' />
        </svg>
        <span>{pagination}</span>
      </div>
      <Swiper
        className='w-full aspect-video md:mb-[76.5px] md:w-[270px] md:min-w-[270px] lg:w-[530px] lg:min-w-[530px] lg:max-h-[200px] bg-black'
        {...swiperConfig}
        style={{
          '--swiper-navigation-size': '24px',
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
      >
        {images.map((img) => (
          <SwiperSlide key={img?.cloudinary_id}>
            <img className='w-full h-full object-cover' src={img?.secure_url} alt={img?.cloudinary_id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default CardSwiper
