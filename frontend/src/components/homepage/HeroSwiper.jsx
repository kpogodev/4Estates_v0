import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { handleSwiperProgress, handleSetTransition } from '../../utils/homeSwiper';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../../features/properties/propertiesSlice';
import HeroSwiperContent from './HeroSwiperContent';

function HeroSwiper() {
  const dispatch = useDispatch();

  const { properties, isError, isSuccess, message } = useSelector((state) => state.properties);

  useEffect(() => {
    const query = {
      select: 'price,location,images,description',
    };
    dispatch(getProperties(query));
  }, [dispatch]);

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
      className={'!pb-8'}
    >
      {properties.map((property) => (
        <SwiperSlide key={property._id} className='!w-[520px] !h-[340px] bg-white'>
          <HeroSwiperContent property={property} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSwiper;
