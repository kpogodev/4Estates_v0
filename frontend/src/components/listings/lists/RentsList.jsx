import { useId } from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { selectRentsSorted, selectRentsIsLoading } from 'redux/rents/rentsSlice'
import PropertyCard from 'components/listings/property_card/PropertyCard'
import { AnimatePresence, motion } from 'framer-motion'
import PropertyCardPlaceholder from '../property_card/PropertyCardPlaceholder'

function RentsList() {
  const listKey = useId()

  const rents = useSelector(selectRentsSorted)
  const loading = useSelector(selectRentsIsLoading)

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
      className='w-full col-span-2 flex flex-col items-stretch gap-7 min-h-[400px]'
      initial='hidden'
      animate='show'
      variants={animVariant}
    >
      <AnimatePresence initial={false}>
        <>
          {rents.length > 0 &&
            rents.map((rent, index) =>
              index + 1 !== rents.length ? <PropertyCard key={rent._id} data={rent} type='rent' /> : <PropertyCard key={rent._id} data={rent} type='rent' />
            )}
          {(loading || rents.length <= 0) && <PropertyCardPlaceholder key={nanoid()} />}
        </>
      </AnimatePresence>
    </motion.div>
  )
}

export default RentsList
