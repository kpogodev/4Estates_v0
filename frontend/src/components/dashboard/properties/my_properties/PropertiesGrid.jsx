import React from 'react'
import PropertyThumb from './PropertyThumb'
import { motion } from 'framer-motion'
import { forViewSwitcher } from '../../../../utils/animationVariants'

function PropertiesGrid({ properties }) {
  return (
    <motion.div
      className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 xl:h-[500px] overflow-y-auto
      '
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
