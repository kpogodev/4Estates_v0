import { motion, AnimatePresence } from 'framer-motion'
import { duration } from 'moment'
import { useId } from 'react'

function Accordion({ isOpen, setOpen, children }) {
  const accordionKey = useId()
  const accordionContentKey = useId()
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key={accordionKey}
          initial='collapsed'
          animate='open'
          exit='collapsed'
          variants={{
            open: {
              height: 'auto',
              opacity: 1,
            },
            collapsed: {
              height: 0,
              opacity: 0,
            },
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            key={accordionContentKey}
            variants={{
              collapsed: { scale: 0 },
              open: {
                scale: 1,
                transition: { delay: 0.3, duration: 0.25, ease: 'easeInOut' },
              },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Accordion
