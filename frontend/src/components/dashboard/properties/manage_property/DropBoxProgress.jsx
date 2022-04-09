import { motion } from 'framer-motion'
import { simpleFadeInOut } from 'utils/animationVariants'

function DropBoxProgress({ progress }) {
  return (
    <motion.div
      variants={simpleFadeInOut}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='flex flex-col items-center gap-4'
    >
      <div className='radial-progress text-primary' style={{ '--value': progress }}>
        {progress < 100 ? progress : 99}%
      </div>
      <p className='text-xl font-extrabold animate-pulse text-primary'>Uploading...</p>
    </motion.div>
  )
}

export default DropBoxProgress
