import { useId } from 'react'
import { useSelector } from 'react-redux'
import { selectRentsSorted } from 'redux/rents/rentsSlice'
import PropertyCard from 'components/listings/property_card/PropertyCard'
import { AnimatePresence, motion } from 'framer-motion'

function RentsList() {
  const listKey = useId()
  const rents = useSelector(selectRentsSorted)

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
    <motion.div
      key={listKey}
      className='w-full col-span-2 flex flex-col items-stretch gap-7 min-h-[400px] mt-10'
      initial='hidden'
      animate='show'
      variants={animVariant}
    >
      <AnimatePresence initial={false}>{rents.length > 0 && rents.map((rent) => <PropertyCard key={rent._id} data={rent} type='rent' />)}</AnimatePresence>
    </motion.div>
  )
}

export default RentsList
