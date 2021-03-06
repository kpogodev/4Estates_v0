import { toLocalCurrency } from 'utils/toLocalCurrency'
import { useSwiperSlide } from 'swiper/react'
import no_images from 'assets/no-image.png'

export default function HeroSwiperContent({ location, price, images }) {
  const swiperSlide = useSwiperSlide()
  return (
    <div className='carousel-slider-animate-opacity bg-black'>
      {images.length > 0 ? (
        <img
          src={images[0]?.secure_url}
          className={`block w-full h-[340px] object-cover shadow-lg ${swiperSlide.isActive ? 'opacity-100' : 'opacity-70'} transition-opacity`}
          alt={location.formatted_address}
        />
      ) : (
        <img
          src={no_images}
          className={`block w-full h-[340px] object-contain shadow-lg ${swiperSlide.isActive ? 'opacity-100' : 'opacity-70'} transition-opacity`}
          alt='Placeholder'
        />
      )}
      <div className={`absolute left-0 bottom-0 w-full py-6 px-4 flex flex-col items-start bg-gradient-to-t from-[rgba(0,0,0,0.75)] to-transparent`}>
        <p className='text-2xl text-white font-bold'>
          {location.street}, {location.city}
        </p>
        <p className='text-2xl text-white font-bold'>{toLocalCurrency('en-EN', price, 'GBP')}</p>
      </div>
    </div>
  )
}
