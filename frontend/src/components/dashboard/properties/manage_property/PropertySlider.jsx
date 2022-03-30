import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProperty } from '../../../../features/properties/propertiesSlice'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function PropertySlider({ className }) {
  const [show, setShow] = useState(false)
  const [slider, setSlider] = useState(null)
  const [thumbs, setThumbs] = useState(null)
  const [pagination, setPagination] = useState('')

  const { property, isSuccess } = useSelector((state) => state.properties)

  const dispatch = useDispatch()

  const swiperConfig = {
    slidesPerView: 1,
    modules: [Navigation, Thumbs],
    navigation: true,
    thumbs: { swiper: thumbs },
    onInit: ({ activeIndex }) => setPagination(`${activeIndex + 1} / ${property.images.length}`),
    onSlideChange: ({ activeIndex }) => setPagination(`${activeIndex + 1} / ${property.images.length}`),
    onUpdate: ({ activeIndex }) => setPagination(`${activeIndex + 1} / ${property.images.length}`),
    onSwiper: (swiper) => setSlider(swiper),
  }

  const swiperThumbsConfig = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    watchSlidesProgress: true,
    onSwiper: (swiper) => setThumbs(swiper),
  }

  const showThumbs = useCallback(() => {
    setShow(true)
  }, [])

  const hideThumbs = useCallback(() => {
    setShow(false)
  }, [])

  const changeMainPhoto = useCallback(
    (e) => {
      const elementToMove = e.target.dataset.id

      const newArray = [...property.images].sort((a, b) =>
        a.cloudinary_id === elementToMove ? -1 : b.cloudinary_id === elementToMove ? 1 : 0
      )

      dispatch(updateProperty({ data: { images: newArray }, id: property._id }))
    },
    [property.images, property._id, dispatch]
  )

  useEffect(() => {
    if (isSuccess) {
      slider.update()
      slider.slideTo(0)
    }
  }, [slider, isSuccess])

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
        {property.images.map((img, index) => (
          <SwiperSlide key={img.cloudinary_id} className='relative'>
            <img className='block w-full h-full object-cover' src={img.secure_url} alt={img.cloudinary_id} />
            {index === 0 ? (
              <div className='badge badge-primary badge-lg absolute top-5 left-1/2 -translate-x-1/2 z-10 font-semibold'>
                Main Photo
              </div>
            ) : (
              <button
                onClick={changeMainPhoto}
                className='btn btn-neutral btn-sm font-semibold absolute top-5 left-1/2 !-translate-x-1/2 z-10 no-animation'
                data-id={img.cloudinary_id}
              >
                Set as Main
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`w-full min-h-[60px] p-5 absolute left-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent transition-all ${
          show ? 'translate-y-0 opacity-1' : 'translate-y-[100%] opacity-0'
        }`}
      >
        <Swiper className='max-w-[500px] font-semibold text-white' {...swiperThumbsConfig}>
          {property.images.map((img) => (
            <SwiperSlide
              key={img.cloudinary_id}
              className='rounded-md shadow-lg overflow-hidden cursor-pointer !w-[90px] !h-[60px]'
            >
              <img src={img.secure_url} alt={img.cloudinary_id} className={`block w-full h-full object-cover`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute right-5 bottom-5 text-white font-bold text-xl drop-shadow'>
          {property.images.length > 0 ? pagination : 'Gallery is empty'}
        </div>
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
