import React from 'react'
import ProfilePanel from '../components/dashboard/profile/ProfilePanel'
import { motion } from 'framer-motion'
import { pageTransition } from '../utils/animationVariants'
import PropertiesPanel from '../components/dashboard/properties/PropertiesPanel'

function Dashboard() {
  return (
    <motion.div
      className='grid grid-cols-1 gap-5 xl:grid-cols-3 lg:gap-10'
      variants={pageTransition}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <ProfilePanel />
      <div className='flex flex-col gap-5 lg:gap-10 col-span-2'>
        <PropertiesPanel />
      </div>
    </motion.div>
  )
}

export default Dashboard
