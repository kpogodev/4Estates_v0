import { useEffect, useId } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getRents } from 'context/rents/rentsSlice'
import RentsList from 'components/listings/RentsList'
import ListingMap from 'components/listings/ListingMap'
import SearchBox from 'components/listings/search_box/SearchBox'

function Rents() {
  const [searchParams] = useSearchParams()
  const { rents } = useSelector((state) => state.rents)

  const pageKey = useId()
  const dispatch = useDispatch()

  useEffect(() => {
    console.count('Get Rentals')
    dispatch(getRents(searchParams.toString()))
  }, [dispatch, searchParams])

  return (
    <motion.div key={pageKey}>
      <div className='grid grid-cols-3 mb-10 gap-5'>
        <ListingMap data={rents} />
        <SearchBox />
      </div>
      <RentsList rents={rents} />
    </motion.div>
  )
}

export default Rents
