import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRents } from 'context/rents/rentsSlice'
import RentsList from 'components/listings/RentsList'
import ListingMap from 'components/listings/ListingMap'
import SearchBox from 'components/listings/SearchBox'

function Rents() {
  const { rents } = useSelector((state) => state.rents)
  const dispatch = useDispatch()

  useEffect(() => {
    if (rents.length === 0) {
      dispatch(getRents())
    }
  }, [dispatch])

  return (
    <div>
      <SearchBox />
      <ListingMap data={rents} zone={{ center: null, radius: null }} />
      <RentsList rents={rents} />
    </div>
  )
}

export default Rents
