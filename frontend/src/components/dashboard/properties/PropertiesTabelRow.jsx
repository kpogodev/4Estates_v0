import { motion } from 'framer-motion'
import { forViewSwitcherItems } from '../../../utils/animationVariants'
import { Link } from 'react-router-dom'

function PropertiesTabelRow({ property }) {
  return (
    <motion.tr variants={forViewSwitcherItems}>
      <td>
        <div className='flex items-center space-x-3'>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12'>
              <img src={property.images[0].secure_url} alt='Avatar Tailwind CSS Component' />
            </div>
          </div>
          <div>
            <div className='font-bold'>{property.location.street}</div>
            <div className='text-sm opacity-50'>{property.location.postcode}</div>
          </div>
        </div>
      </td>
      <td className='capitalize'>{property.type}</td>
      <td>
        {property.is_published ? (
          <div className='badge badge-success'>Published</div>
        ) : (
          <div className='badge badge-accent'>Not Published</div>
        )}
      </td>
      <th>
        <Link to={`/property/${property._id}`} className='btn btn-ghost btn-xs'>
          details
        </Link>
      </th>
    </motion.tr>
  )
}

export default PropertiesTabelRow
