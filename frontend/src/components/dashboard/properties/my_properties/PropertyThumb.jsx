import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { forViewSwitcherItems } from 'utils/animationVariants'

function PropertyThumb({ property }) {
  return (
    <motion.div variants={forViewSwitcherItems} className='h-fit'>
      <Link to={`/user/manage-property/${property._id}`} className='card bg-base-100 shadow-lg image-full hover:before:opacity-30 before:transition-opacity'>
        <img className='w-full !h-[140px] lg:!h-[200px] object-cover' src={property?.images[0]?.secure_url} alt='' />
        <div className='card-body justify-center items-center p-4 gap-0'>
          <h3 className='card-title text-center'>{property.location.street}</h3>
          <span className='font-medium'>{property.location.postcode}</span>
        </div>
      </Link>
    </motion.div>
  )
}

export default PropertyThumb
