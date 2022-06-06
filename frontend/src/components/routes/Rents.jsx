import { useEffect, useId } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getRents, resetRents } from 'redux/rents/rentsSlice'
import RentsList from 'components/listings/lists/RentsList'
import ListingMap from 'components/listings/map/ListingMap'
import SearchBox from 'components/listings/search_box/SearchBox'
import { pageTransition } from 'utils/animationVariants'
import InfoBar from 'components/listings/info_bar/InfoBar'
import RecentSearch from 'components/listings/recent_search/RecentSearch'
import RelatedSearch from 'components/listings/related_search/RelatedSearch'

function Rents() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const pageKey = useId()

  const location_present = searchParams.get('lng') && searchParams.get('lat') && searchParams.get('radius') ? true : false

  useEffect(() => {
    if (location_present) {
      dispatch(getRents(searchParams.toString()))
    }

    return () => {
      dispatch(resetRents())
    }
  }, [dispatch, location_present, searchParams])

  return (
    <motion.div key={pageKey} initial='hidden' animate='visible' exit='exit' variants={pageTransition}>
      <SearchBox />
      <InfoBar location_present={location_present} />
      <ListingMap />
      <div className='container flex flex-col mx-auto py-5 md:py-12 px-3'>
        <div className='flex flex-col items-start lg:grid lg:grid-cols-3 gap-x-5 lg:px-3'>
          <RentsList />
          <div className='flex flex-col col-span-1 gap-7'>
            <RecentSearch />
            <RelatedSearch />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Rents
