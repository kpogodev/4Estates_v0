import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function PropertySlider({ className, images }) {
  const [show, setShow] = useState(false)
  const [thumbs, setThumbs] = useState(null)

  const swiperConfig = {
    slidesPerView: 1,
    modules: [Navigation, Thumbs],
    navigation: true,
    thumbs: { swiper: thumbs },
  }

  const swiperThumbsConfig = {
    modules: [Pagination],
    slidesPerView: 5,
    spaceBetween: 10,
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    pagination: {
      type: 'fraction',
    },
    onSwiper: (swiper) => setThumbs(swiper),
  }

  const showThumbs = useCallback(() => {
    setShow(true)
  }, [])

  const hideThumbs = useCallback(() => {
    setShow(false)
  }, [])

  return (
    <div
      className={`relative ${className} overflow-hidden`}
      tabIndex={0}
      onMouseEnter={showThumbs}
      onMouseLeave={hideThumbs}
      onFocus={showThumbs}
      onBlur={hideThumbs}
    >
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        className='w-full h-full col-span-8'
        {...swiperConfig}
      >
        {images.map((img) => (
          <SwiperSlide key={img.cloudinary_id}>
            <img src={img.secure_url} alt={img.cloudinary_id} className='block w-full h-full object-cover' />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`w-full p-5 pb-0 bg-neutral absolute left-0 bottom-0 z-10 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 transition-transform ${
          show ? 'translate-y-0' : 'translate-y-[100%]'
        }`}
      >
        <Swiper className='max-w-[500px] !pb-10 font-semibold text-white' {...swiperThumbsConfig}>
          {images.map((img) => (
            <SwiperSlide key={img.cloudinary_id} className='rounded-md shadow-lg overflow-hidden cursor-pointer'>
              <img src={img.secure_url} alt={img.cloudinary_id} className={`block w-full h-full object-cover`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

PropertySlider.defaultProps = {
  className: 'col-span-12 grid grid-cols-12 gap-5',
}

PropertySlider.propTypes = {
  className: PropTypes.string,
}

export default PropertySlider
