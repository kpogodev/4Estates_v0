import { useId } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { selectIsAuth } from 'redux/auth/authSlice'
import CardHeader from './CardHeader'
import CardPropertyDetails from './CardPropertyDetails'
import CardSwiper from './CardSwiper'
import CardContact from './CardContact'
import CardLikeButton from './CardLikeButton'

function PropertyCard({ data, type }) {
  const cardKey = useId()
  const isAuth = useSelector(selectIsAuth)
  return (
    <motion.div
      className='relative card md:card-side bg-white shadow-lg rounded-lg lg:rounded-md max-w-5xl'
      key={cardKey}
      layout
      variants={{
        hidden: {
          scale: 0,
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        },
        show: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
          },
        },
      }}
      initial='hidden'
      animate='show'
      exit='hidden'
    >
      <CardSwiper images={data.property.images} />
      <CardHeader type={type} price={data.price} is_premium={data.publisher.is_premium.active} />
      <div className='card-body p-3 md:p-4 gap-3'>
        <CardPropertyDetails property={data.property} addedOn={data.createdAt} addedBy={data.publisher.name} />
        <CardContact data={data} />
      </div>
      {isAuth && <CardLikeButton />}
    </motion.div>
  )
}

export default PropertyCard
