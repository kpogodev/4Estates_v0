import { useEffect, useId } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getRents } from 'redux/rents/rentsSlice'
import RentsList from 'components/listings/lists/RentsList'
import ListingMap from 'components/listings/map/ListingMap'
import SearchBox from 'components/listings/search_box/SearchBox'
import { pageTransition } from 'utils/animationVariants'

function Rents() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const pageKey = useId()

  useEffect(() => {
    if (searchParams.get('lng') && searchParams.get('lat') && searchParams.get('radius')) {
      dispatch(getRents(`${searchParams.toString()}&limit=50`))
    }
  }, [dispatch, searchParams])

  return (
    <motion.div
      key={pageKey}
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={pageTransition}
      className='flex flex-col lg:grid lg:grid-cols-3 gap-x-5 lg:px-3'
    >
      <ListingMap />
      <SearchBox />
      <RentsList />
    </motion.div>
  )
}

export default Rents
