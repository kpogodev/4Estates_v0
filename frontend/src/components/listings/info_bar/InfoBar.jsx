import { useSelector } from 'react-redux'
import { selectRentsCount, selectRentsIsLoading } from 'redux/rents/rentsSlice'
import Results from './Results'

function InfoBar({ location_present }) {
  const rentsCount = useSelector(selectRentsCount)
  const rentsIsLoading = useSelector(selectRentsIsLoading)

  return (
    <div className='bg-warning font-bold text-center'>
      {!location_present && <p className='px-3 py-2'> To display properties in your area, please select a location and radius.</p>}
      {location_present && rentsCount === 0 && !rentsIsLoading && <p className='px-3 py-2'>There is no properties matching your criteria</p>}
      {location_present && rentsCount > 0 && <Results rents_count={rentsCount} />}
    </div>
  )
}

export default InfoBar
