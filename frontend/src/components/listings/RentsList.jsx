import PropertyCard from 'components/listings/property_card/PropertyCard'
import {motion} from 'framer-motion'

function RentsList({ rents }) {
  return (
    <motion.div className='w-full flex flex-col items-stretch gap-7'>
      {rents.map((rent) => (
        <PropertyCard key={rent._id} data={rent} type='rent' />
      )).reverse()}
    </motion.div>
  )
}

export default RentsList
