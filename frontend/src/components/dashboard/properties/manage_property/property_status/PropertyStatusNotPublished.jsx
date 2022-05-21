import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function PropertyStatusNotPublished() {
  const { id: propertyId } = useParams()
  return (
    <div className='flex items-center gap-4'>
      <span className='badge badge-lg'>Not Published</span>
      <Link to={`/user/publish-property/${propertyId}`} className='btn btn-link px-0'>
        Publish This Property
      </Link>
    </div>
  )
}

export default PropertyStatusNotPublished
