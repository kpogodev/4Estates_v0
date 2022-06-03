import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
function NotFound() {
  return (
    <motion.div className='container flex flex-col mx-auto py-5 md:py-12 px-3' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      NotFound
    </motion.div>
  )
}

export default NotFound
