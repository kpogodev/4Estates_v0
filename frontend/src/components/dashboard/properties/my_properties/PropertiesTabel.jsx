import React from 'react'
import { motion } from 'framer-motion'
import { forViewSwitcher } from 'utils/animationVariants'
import PropertiesTabelRow from './PropertiesTabelRow'

function PropertiesTabel({ properties }) {
  return (
    <motion.div variants={forViewSwitcher} initial='hidden' animate='visible' exit='exit'>
      <div className='overflow-x-auto w-full'>
        <div className='flex flex-col w-full lg:text-lg'>
          <div>
            <div className='w-full grid grid-cols-12 place-items-center font-bold py-2 px-1 bg-slate-100'>
              <div className='col-span-6 justify-self-start'>Property</div>
              <div className='col-span-2'>Property Type</div>
              <div className='col-span-2'>Status</div>
              <div className='col-span-2'></div>
            </div>
          </div>
          <div className='flex flex-col w-full gap-3 py-3 max-h-[450px] overflow-y-auto'>
            {properties.map((property) => (
              <PropertiesTabelRow key={property._id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PropertiesTabel
