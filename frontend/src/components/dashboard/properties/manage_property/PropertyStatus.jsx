import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRental } from 'context/rents/rentsSlice'
import PropertyStatusPublished from './PropertyStatusPublished'
import PropertyStatusNotPublished from './PropertyStatusNotPublished'

function PropertyStatus({ property }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRental(property._id))
  }, [dispatch, property._id])

  return (
    <div className='w-full flex flex-col items-start justify-start gap-4'>
      <h3 className='text-xl xl:text-2xl font-semibold'>Property Status</h3>
      {property.is_published ? <PropertyStatusPublished /> : <PropertyStatusNotPublished property={property} />}
    </div>
  )
}

export default PropertyStatus
