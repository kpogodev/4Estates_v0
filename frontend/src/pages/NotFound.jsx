import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animationVariants';
function NotFound() {
  return (
    <motion.div variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      NotFound
    </motion.div>
  );
}

export default NotFound;
