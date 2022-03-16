import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { forViewSwitcherItems } from '../../../utils/animationVariants'

function PropertyThumb({ property }) {
  return (
    <motion.div variants={forViewSwitcherItems}>
      <Link
        to={`/property/${property._id}`}
        className='card bg-base-100 shadow-lg image-full hover:before:opacity-30 before:transition-opacity'
      >
        <figure>
          <img className='w-full !h-[140px] lg:!h-[200px]' src={property.images[0].secure_url} alt='' />
        </figure>
        <div className='card-body justify-center items-center p-4'>
          <h3 className='card-title'>{property.location.street}</h3>
        </div>
      </Link>
    </motion.div>
  )
}

export default PropertyThumb
