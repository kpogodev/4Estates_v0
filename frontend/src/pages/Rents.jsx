import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRents } from 'context/rents/rentsSlice'
import RentsList from 'components/listings/RentsList'

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
      <RentsList rents={rents}/>
    </div>
  )
}

export default Rents
