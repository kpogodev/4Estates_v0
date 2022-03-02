import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { handleSwiperProgress, handleSetTransition } from '../../utils/homeSwiper';

function HeroSwiper() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      grabCursor={true}
      watchSlidesProgress={true}
      loop={true}
      loopedSlides={5}
      slidesPerView='auto'
      centeredSlides={true}
      onProgress={handleSwiperProgress}
      onSetTransition={handleSetTransition}
      className={'pb-8'}
    >
      <SwiperSlide className={'!w-[520px]'}>
        <div className='carousel-slider-animate-opacity'>
          <img src='https://picsum.photos/520/380?random=1' />
        </div>
      </SwiperSlide>
      <SwiperSlide className={'!w-[520px]'}>
        <div className='carousel-slider-animate-opacity'>
          <img src='https://picsum.photos/520/380?random=2' />
        </div>
      </SwiperSlide>
      <SwiperSlide className={'!w-[520px]'}>
        <div className='carousel-slider-animate-opacity'>
          <img src='https://picsum.photos/520/380?random=3' />
        </div>
      </SwiperSlide>
      <SwiperSlide className={'!w-[520px]'}>
        <div className='carousel-slider-animate-opacity'>
          <img src='https://picsum.photos/520/380?random=4' />
        </div>
      </SwiperSlide>
      <SwiperSlide className={'!w-[520px]'}>
        <div className='carousel-slider-animate-opacity'>
          <img src='https://picsum.photos/520/380?random=5' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HeroSwiper;
