import { motion } from 'framer-motion'
import { forViewSwitcherItems } from '../../../../utils/animationVariants'
import { Link } from 'react-router-dom'

function PropertiesTabelRow({ property }) {
  return (
    <motion.div variants={forViewSwitcherItems} className='w-full grid grid-cols-12 place-items-center'>
      <Link to={`/manage-property/${property._id}`} className='col-span-6 justify-self-start'>
        <div className='flex items-center space-x-3'>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12 bg-slate-400'>
              <img src={property?.images[0]?.secure_url} alt='' />
            </div>
          </div>
          <div>
            <div className='font-bold'>{property.location.street}</div>
            <div className='text-sm opacity-50'>{property.location.postcode}</div>
          </div>
        </div>
      </Link>
      <div className='capitalize col-span-2'>{property.type}</div>
      <div className='col-span-2'>
        {property.is_published ? (
          <div className='badge badge-success font-medium'>Published</div>
        ) : (
          <div className='badge badge-neutral font-medium'>Not Published</div>
        )}
      </div>
      <div className='col-span-2'>
        <Link to={`/manage-property/${property._id}`} className='btn btn-primary btn-xs'>
          details
        </Link>
      </div>
    </motion.div>
  )
}

export default PropertiesTabelRow
