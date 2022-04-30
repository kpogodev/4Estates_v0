import { useState, useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProperty, deletePropertyImage } from 'context/properties/propertiesSlice'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, EffectFade } from 'swiper'
import { MdDeleteForever, MdPublishedWithChanges } from 'react-icons/md'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

function PropertySlider({ className }) {
  const [show, setShow] = useState(false)
  const [pagination, setPagination] = useState('')

  const sliderRef = useRef(null)
  const thumbsRef = useRef(null)

  const { property, isSuccess } = useSelector((state) => state.properties)

  const dispatch = useDispatch()

  const swiperConfig = {
    slidesPerView: 1,
    modules: [Navigation, Thumbs, EffectFade],
    navigation: true,
    thumbs: { swiper: thumbsRef.current },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    onInit: ({ activeIndex }) => setPagination(`${activeIndex + 1} / ${property.images.length}`),
    onSlideChange: ({ activeIndex }) => setPagination(`${activeIndex + 1} / ${property.images.length}`),
    onUpdate: ({ activeIndex }) => setPagination(`${activeIndex + 1} / ${property.images.length}`),
    onSwiper: (swiper) => (sliderRef.current = swiper),
  }

  const swiperThumbsConfig = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    watchSlidesProgress: true,
    onSwiper: (swiper) => (thumbsRef.current = swiper),
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
      const newArray = [...property.images].sort((a, b) => (a.cloudinary_id === elementToMove ? -1 : b.cloudinary_id === elementToMove ? 1 : 0))
      dispatch(updateProperty({ data: { images: newArray }, id: property._id }))
    },
    [property.images, property._id, dispatch]
  )

  const deletePhoto = useCallback(
    (e) => {
      const elementToDelete = e.target.dataset.id
      dispatch(deletePropertyImage({ image: property.images.find((item) => item.cloudinary_id === elementToDelete), propertyId: property._id }))
    },
    [property.images, property._id, dispatch]
  )

  useEffect(() => {
    if (isSuccess) {
      sliderRef.current.update()
      sliderRef.current.slideTo(0)
      thumbsRef.current.update()
      thumbsRef.current.slideTo(0)
    }
  }, [isSuccess])

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
        {property?.images.map((img, index) => (
          <SwiperSlide key={img?.cloudinary_id} className='relative'>
            <img className='block w-full h-full object-cover' src={img?.secure_url} alt={img?.cloudinary_id} />
            <div className='flex items-center gap-2 absolute right-4 top-4 z-10 '>
              {index === 0 ? (
                <div className='badge badge-accent badge-lg font-semibold text-xl shadow-lg'>Main Photo</div>
              ) : (
                <button
                  onClick={changeMainPhoto}
                  className='flex items-center gap-1 btn btn-primary btn-sm font-semibold z-10 no-animation shadow-lg'
                  data-id={img?.cloudinary_id}
                >
                  <MdPublishedWithChanges className='text-lg pointer-events-none' />
                  <span className='pointer-events-none'>Set as Main</span>
                </button>
              )}
              <button
                className='flex items-center gap-1 btn btn-error btn-sm shadow-lg text-[#fff] hover:brightness-90 focus:brightness-90'
                data-id={img?.cloudinary_id}
                onClick={deletePhoto}
              >
                <MdDeleteForever className='text-lg pointer-events-none' />
                <span className='pointer-events-none'>Delete</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`w-full min-h-[60px] p-5 absolute left-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent transition-all ${
          show ? 'translate-y-0 opacity-1' : 'translate-y-[100%] opacity-0'
        }`}
      >
        <Swiper className='max-w-[500px] font-semibold text-white hidden md:block' {...swiperThumbsConfig}>
          {property?.images.map((img) => (
            <SwiperSlide key={img?.cloudinary_id} className='rounded-md shadow-lg overflow-hidden cursor-pointer !w-[90px] !h-[60px]'>
              <img src={img?.secure_url} alt={img?.cloudinary_id} className={`block w-full h-full object-cover`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute right-5 bottom-5 text-white font-bold text-xl drop-shadow'>
          {property?.images?.length > 0 ? pagination : 'Gallery is empty'}
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
