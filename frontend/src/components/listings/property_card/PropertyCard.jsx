import { useId } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CardHeader from './CardHeader'
import CardPropertyDetails from './CardPropertyDetails'
import CardSwiper from './CardSwiper'
import CardContact from './CardContact'

function PropertyCard({ data, type }) {
  const cardKey = useId()

  return (
    <motion.div
      className='relative card md:card-side bg-white shadow-lg rounded-lg lg:rounded-md max-w-5xl focus-within:shadow-custom-color focus-within:outline-none transition-shadow'
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
      tabIndex={0}
      data-offer-id={data._id}
    >
      <CardSwiper images={data.property.images} />
      <CardHeader type={type} price={data.price} is_premium={data.publisher.is_premium.active} />
      <div className='relative card-body p-3 md:p-4 gap-3'>
        <Link to={`./${data._id}`} className='absolute top-0 left-0 bottom-0 right-0' />
        <CardPropertyDetails property={data.property} addedOn={data.createdAt} addedBy={data.publisher.name} />
        <CardContact data={data} />
      </div>
    </motion.div>
  )
}

export default PropertyCard
