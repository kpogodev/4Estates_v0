import React from 'react'
import PropertyThumb from './PropertyThumb'
import { motion } from 'framer-motion'
import { forViewSwitcher } from '../../../utils/animationVariants'

function PropertiesGrid({ properties }) {
  return (
    <motion.div
      className='w-full grid grid-cols-5 gap-3'
      variants={forViewSwitcher}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {properties.map((property) => (
        <PropertyThumb key={property._id} property={property} />
      ))}
    </motion.div>
  )
}

export default PropertiesGrid
