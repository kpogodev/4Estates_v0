import { useId } from 'react'
import PropertyCard from 'components/listings/property_card/PropertyCard'
import { AnimatePresence, motion } from 'framer-motion'

function RentsList({ rents }) {
  const listKey = useId()

  const animVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  }

  return (
    <motion.div key={listKey} className='w-full flex flex-col items-stretch gap-7 min-h-[400px]' initial='hidden' animate='show' variants={animVariant}>
      <AnimatePresence initial={false}>
        {rents.map((rent) => (
          <PropertyCard key={rent._id} data={rent} type='rent' />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default RentsList
