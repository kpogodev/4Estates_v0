import { toLocalCurrency } from '../../utils/toLocalCurrency';
import { useSwiperSlide } from 'swiper/react';

export default function HeroSwiperContent({ property: { description, location, price, images } }) {
  const swiperSlide = useSwiperSlide();

  return (
    <div className='carousel-slider-animate-opacity bg-black'>
      <img
        src={images[0].secure_url}
        className={`block w-full h-[340px] object-cover shadow-lg ${
          swiperSlide.isActive ? 'opacity-100' : 'opacity-70'
        } transition-opacity`}
        alt={location.formatedAddres}
      />
      <div className='absolute left-0 bottom-0 w-full py-6 px-4 flex flex-col items-start bg-gradient-to-t from-[rgba(0,0,0,0.75)] to-transparent'>
        <p className='text-2xl text-white font-bold'>
          {location.street}, {location.city}
        </p>
        <p className='text-2xl text-white font-bold'>{toLocalCurrency('en-EN', price)}</p>
      </div>
    </div>
  );
}
