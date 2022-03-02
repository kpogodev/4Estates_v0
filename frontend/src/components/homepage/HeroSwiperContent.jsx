import { toLocalCurrency } from '../../utils/toLocalCurrency';
import { useSwiperSlide } from 'swiper/react';

export default function HeroSwiperContent({ property: { description, location, price, images } }) {
  const swiperSlide = useSwiperSlide();

  return (
    <div className='carousel-slider-animate-opacity bg-black'>
      <img
        src={images[0].secure_url}
        className={`block w-[520px] h-[380px] object-cover ${
          swiperSlide.isActive ? 'opacity-100' : 'opacity-70'
        } transition-opacity`}
        style={{
          webkitBoxReflect:
            'below 5px -webkit-linear-gradient(bottom,rgba(255,0,0,0.1) 0%,transparent 32px,transparent 100%)',
        }}
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
