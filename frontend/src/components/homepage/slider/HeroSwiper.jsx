import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { handleSwiperProgress, handleSetTransition } from '../../../utils/homeSwiper'
import { useDispatch, useSelector } from 'react-redux'
import { getRents, selectAllRents, selectRentsIsSuccess, resetSuccess, resetRents } from 'redux/rents/rentsSlice'
import HeroSwiperContent from './HeroSwiperContent'

function HeroSwiper() {
  const dispatch = useDispatch()

  const rents = useSelector(selectAllRents)
  const rentsIsSuccess = useSelector(selectRentsIsSuccess)

  useEffect(() => {
    dispatch(getRents({ select: 'price,property,createdAt' }))

    return () => {
      dispatch(resetRents())
    }
  }, [dispatch])

  useEffect(() => {
    rentsIsSuccess && dispatch(resetSuccess())
  }, [rentsIsSuccess, dispatch])

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      grabCursor={true}
      watchSlidesProgress={true}
      loop={true}
      loopedSlides={10}
      slidesPerView='auto'
      centeredSlides={true}
      autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      onProgress={handleSwiperProgress}
      onSetTransition={handleSetTransition}
      onInit={(swiper) => swiper.slideNext()}
    >
      {rents.map((rent) => (
        <SwiperSlide key={rent._id} className='!w-[520px] !h-[340px] bg-white'>
          <HeroSwiperContent price={rent.price} location={rent.property.location} images={rent.property.images} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroSwiper
