import React from 'react'
import { motion } from 'framer-motion'
import { forViewSwitcher } from '../../../utils/animationVariants'
import PropertiesTabelRow from './PropertiesTabelRow'

function PropertiesTabel({ properties }) {
  return (
    <motion.div variants={forViewSwitcher} initial='hidden' animate='visible' exit='exit'>
      <div className='overflow-x-auto w-full'>
        <table className='table w-full lg:text-lg'>
          <thead>
            <tr>
              <th>Property</th>
              <th>Property Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <PropertiesTabelRow key={property._id} property={property} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Property</th>
              <th>Property Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </motion.div>
  )
}

export default PropertiesTabel
