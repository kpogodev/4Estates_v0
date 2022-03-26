import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function PropertySlider({ className, images }) {
  const swiperConfig = {
    slidesPerView: 1,
  }

  return (
    <div className={`${className}`}>
      <Swiper className='w-full h-full col-span-8' {...swiperConfig}>
        {images.map((img) => (
          <SwiperSlide key={img.cloudinary_id}>
            <img src={img.secure_url} alt={img.cloudinary_id} className='block w-full h-full object-cover' />
          </SwiperSlide>
        ))}
      </Swiper>
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
