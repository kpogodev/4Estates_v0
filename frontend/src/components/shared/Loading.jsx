import { motion } from 'framer-motion'
import { pageTransition } from '../../utils/animationVariants'

function Loading() {
  return (
    <motion.div
      variants={pageTransition}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='flex gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]'
    >
      <div className='loading w-8 h-8 rounded-full bg-primary'></div>
      <div className='loading w-8 h-8 rounded-full bg-accent'></div>
      <div className='loading w-8 h-8 rounded-full bg-secondary'></div>
    </motion.div>
  )
}

export default Loading
