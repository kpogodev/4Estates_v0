import React from 'react'
import { motion } from 'framer-motion'
import { formContentChange } from '../../../../../utils/animationVariants'

function PublishSaleDetails({ onChange, formData, handleNext, handlePrev }) {
  return (
    <motion.div variants={formContentChange} initial='hidden' animate='visible' exit='exit'>
      PublishSaleDetails
    </motion.div>
  )
}

export default PublishSaleDetails
