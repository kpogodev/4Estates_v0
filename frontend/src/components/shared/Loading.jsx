import { useId } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'

function Loading({ className }) {
  const keyId = useId()
  return (
    <motion.div key={keyId} variants={pageTransition} initial='hidden' animate='visible' exit='exit' className={className}>
      <div className='loading-screen w-8 h-8 rounded-full bg-primary'></div>
      <div className='loading-screen w-8 h-8 rounded-full bg-accent'></div>
      <div className='loading-screen w-8 h-8 rounded-full bg-secondary'></div>
    </motion.div>
  )
}

Loading.defaultProps = {
  className: 'flex gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]',
}

export default Loading
