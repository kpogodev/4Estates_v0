import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { nanoid } from '@reduxjs/toolkit'

function Results() {
  const { rents } = useSelector((state) => state.rents)
  return (
    <p className='font-medium text-lg md:text-xl mt-auto text-center lg:text-left'>
      Properties matching criteria:{' '}
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.span
          key={`${nanoid()}${rents.length}`}
          className='inline-block font-bold'
          initial={{ y: 10, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -10, scale: 0.8, opacity: 0 }}
        >
          {rents.length}
        </motion.span>
      </AnimatePresence>
    </p>
  )
}

export default Results
