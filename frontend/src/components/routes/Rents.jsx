import { useEffect, useId } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getRents, resetRents } from 'redux/rents/rentsSlice'
import RentsList from 'components/listings/lists/RentsList'
import ListingMap from 'components/listings/map/ListingMap'
import SearchBox from 'components/listings/search_box/SearchBox'
import { pageTransition } from 'utils/animationVariants'

function Rents() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const pageKey = useId()

  const location_present = searchParams.get('lng') && searchParams.get('lat') && searchParams.get('radius')

  useEffect(() => {
    if (location_present) {
      dispatch(getRents(searchParams.toString()))
    }

    return () => {
      dispatch(resetRents())
    }
  }, [dispatch, location_present, searchParams])

  return (
    <motion.div key={pageKey} initial='hidden' animate='visible' exit='exit' variants={pageTransition} className=''>
      <SearchBox />
      <div className='container flex flex-col mx-auto py-5 md:py-12 px-3'>
        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-x-5 lg:px-3'>
          <ListingMap />
          <RentsList />
        </div>
      </div>
    </motion.div>
  )
}

export default Rents
